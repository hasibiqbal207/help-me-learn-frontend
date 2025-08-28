import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileId = async (userId) => {
  console.log("Looking up tutor profile for userId:", userId);
  try {
    const result = await executeQuery(
      'SELECT id FROM hm_tutor_profile WHERE userId = ?', 
      [userId]
    );
    console.log("Tutor profile lookup result:", result);
    
    if (result.length === 0) {
      console.warn(`No tutor profile found for userId: ${userId}`);
      return null;
    }
    
    return result[0]?.id;
  } catch (error) {
    console.error("Error getting tutor profile ID:", error);
    throw error;
  }
};

export const updateTutorStatus = async (tutorProfileId) => {
  console.log("Updating tutor status for tutorProfileId:", tutorProfileId);
  try {
    const result = await executeQuery(
      "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?",
      [tutorProfileId]
    );
    console.log("Tutor status update result:", result);
    return result;
  } catch (error) {
    console.error("Error updating tutor status:", error);
    throw error;
  }
};

export const getExistingFile = async (tutorProfileId) => {
  console.log("Getting existing files for tutorProfileId:", tutorProfileId);
  try {
    const result = await executeQuery(
      "SELECT * FROM `helpmelearn`.`hm_file` WHERE `tutorProfileId`= ?",
      [tutorProfileId]
    );
    console.log("Existing files query result:", result);
    return result;
  } catch (error) {
    console.error("Error getting existing files:", error);
    throw error;
  }
};

export const deleteExistingFile = async (tutorProfileId) => {
  console.log("Deleting existing files for tutorProfileId:", tutorProfileId);
  try {
    const result = await executeQuery(
      "DELETE FROM `helpmelearn`.`hm_file` WHERE (`tutorProfileId` = ?)",
      [tutorProfileId]
    );
    console.log("Delete files result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting existing files:", error);
    throw error;
  }
};

export const insertFile = async (fileData) => {
  const { tutorProfileId, fileName, filePath } = fileData;
  console.log("Inserting file data:", { tutorProfileId, fileName, filePath });
  
  try {
    const result = await executeQuery(
      "INSERT INTO `helpmelearn`.`hm_file` (tutorProfileId, fileName, fileType, fileExtension, filePath) VALUES (?, ?, ?, ?, ?)",
      [tutorProfileId, fileName, 0, "pdf", filePath]
    );
    console.log("Insert file result:", result);
    return result;
  } catch (error) {
    console.error("Error inserting file:", error);
    throw error;
  }
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