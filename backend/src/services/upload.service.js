import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileId = async (userId) => {
  const result = await executeQuery(
    'SELECT id FROM hm_tutor_profile WHERE userId = ?', 
    [userId]
  );
  return result[0]?.id;
};

export const updateTutorStatus = async (tutorProfileId) => {
  return executeQuery(
    "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?",
    [tutorProfileId]
  );
};

export const getExistingFile = async (tutorProfileId) => {
  return executeQuery(
    "SELECT * FROM `helpmelearn`.`hm_file` WHERE `tutorProfileId`= ?",
    [tutorProfileId]
  );
};

export const deleteExistingFile = async (tutorProfileId) => {
  return executeQuery(
    "DELETE FROM `helpmelearn`.`hm_file` WHERE (`tutorProfileId` = ?)",
    [tutorProfileId]
  );
};

export const insertFile = async (fileData) => {
  const { tutorProfileId, fileName, filePath } = fileData;
  
  return executeQuery(
    "INSERT INTO `helpmelearn`.`hm_file` (tutorProfileId, fileName, fileType, fileExtension, filePath) VALUES (?, ?, ?, ?, ?)",
    [tutorProfileId, fileName, 0, "pdf", filePath]
  );
};

export const getExistingImage = async (userId) => {
  return executeQuery(
    "SELECT * FROM `helpmelearn`.`hm_image` WHERE `userId`= ?",
    [userId]
  );
};

export const deleteExistingImage = async (userId) => {
  return executeQuery(
    "DELETE FROM `helpmelearn`.`hm_image` WHERE (`userId` = ?)",
    [userId]
  );
};

export const insertImage = async (imageData) => {
  const { imagePath, userId, dateTime } = imageData;
  
  return executeQuery(
    "INSERT INTO `helpmelearn`.`hm_image` (imagePath, date, userId, createdDateTime, modifiedDateTime) VALUES (?, ?, ?, ?, ?)",
    [imagePath, dateTime, userId, dateTime, dateTime]
  );
}; 