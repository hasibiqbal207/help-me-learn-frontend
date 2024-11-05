import database from "../../config/database.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileById = async (userId) => {
  return executeQuery(
    "SELECT id from hm_tutor_profile WHERE userId = ?",
    [userId]
  );
};

export const createReview = async (reviewData) => {
  const { text, rating, userId, tutorProfileId, date } = reviewData;
  
  return executeQuery(
    "INSERT INTO hm_review (`text`, rating, createdDateTime, modifiedDateTime, userId, tutorProfileId) VALUES (?, ?, ?, ?, ?, ?)",
    [text, rating, date, date, userId, tutorProfileId]
  );
};

export const getLastInsertId = async () => {
  return executeQuery("SELECT LAST_INSERT_ID() as id");
};

export const getReviewsByTutorId = async (tutorProfileId) => {
  const query = `
    SELECT hmu.firstName, hmu.lastName, hmr.text, hmr.rating, hmr.createdDateTime 
    FROM helpmelearn.hm_review hmr
    INNER JOIN helpmelearn.hm_user hmu ON (hmr.userId = hmu.id AND hmr.tutorProfileId = ?)
  `;
  
  return executeQuery(query, [tutorProfileId]);
};

export const getReviewsByFilters = async (filters) => {
  let conditions = [];
  const values = [];
  
  if (filters.TutorProfileId !== undefined) {
    conditions.push("tutorProfileId = ?");
    values.push(filters.TutorProfileId);
  }

  if (filters.UserId !== undefined) {
    conditions.push("userId = ?");
    values.push(filters.UserId);
  }

  let query = "SELECT id, `text`, rating, createdDateTime, modifiedDateTime, userId, tutorProfileId FROM helpmelearn.hm_review";
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  return executeQuery(query, values);
};

export const deleteReviewById = async (id) => {
  return executeQuery(
    "DELETE FROM hm_review WHERE id = ?",
    [id]
  );
};

export const updateReview = async (reviewData) => {
  const { Id, Text, Rating, UserId, TutorProfileId, date } = reviewData;
  
  return executeQuery(
    "UPDATE hm_review SET text=?, rating=?, modifiedDateTime=?, userId=?, tutorProfileId=? WHERE id = ?",
    [Text, Rating, date, UserId, TutorProfileId, Id]
  );
}; 