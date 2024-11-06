import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileByUserId = async (userId) => {
  return executeQuery(
    "SELECT * FROM hm_tutor_profile T WHERE T.userId = ?",
    [userId]
  );
};

export const createQualification = async (qualificationData) => {
  const { subjectName, description, grade, tutorProfileId } = qualificationData;
  
  return executeQuery(
    "INSERT INTO hm_qualification (subjectName, description, grade, tutorProfileId) VALUES (?, ?, ?, ?)",
    [subjectName, description, grade, tutorProfileId]
  );
};

export const updateTutorStatus = async (tutorProfileId) => {
  return executeQuery(
    "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?",
    [tutorProfileId]
  );
};

export const getQualificationById = async (id) => {
  console.log('I am here')
  const result = executeQuery(
    "SELECT * FROM hm_qualification WHERE id = ?",
    [id]
  );
  console.log(result)

};

export const getQualificationsByTutorProfileId = async (tutorProfileId) => {
  return executeQuery(
    "SELECT id, subjectName, description, grade FROM hm_qualification WHERE tutorProfileId = ?",
    [tutorProfileId]
  );
};

export const deleteQualificationById = async (id) => {
  return executeQuery(
    "DELETE FROM hm_qualification WHERE id = ?",
    [id]
  );
};

export const updateQualificationById = async (qualificationData) => {
  const { id, subjectName, description, grade } = qualificationData;
  
  return executeQuery(
    "UPDATE hm_qualification SET subjectName = ?, description = ?, grade = ? WHERE id = ?",
    [subjectName, description, grade, id]
  );
};
