import database from "../../config/database.js";

export const createFeedback = async (feedbackData) => {
  const { subject, description, userId, date } = feedbackData;
  
  return new Promise((resolve, reject) => {
    database.query(
      "INSERT INTO hm_feedback(subject, description, createdDateTime, userId) VALUES (?, ?, ?, ?)",
      [subject, description, date, userId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const getAllFeedbacks = async () => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT id, subject, description FROM hm_feedback",
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const getFeedbackById = async (id) => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT id, subject, description FROM hm_feedback WHERE id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const getLastInsertId = async () => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT LAST_INSERT_ID() as id;",
      (err, result) => {
        if (err) reject(err);
        resolve(result[0].id);
      }
    );
  });
}; 