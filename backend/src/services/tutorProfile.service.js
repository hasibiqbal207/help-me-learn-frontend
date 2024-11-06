import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorAboutInfo = async (userId) => {
  return executeQuery(
    `SELECT firstName, lastName, about, age, picPath 
     FROM hm_tutor_profile A, hm_user B 
     WHERE A.userId = B.id AND userId = ?`,
    [userId]
  );
};

export const getTutorOfferedCourses = async (userId) => {
  return executeQuery(
    `SELECT subjectName, ratePerHour, description, experienceYears, availableTime, language, level 
     FROM hm_post A 
     INNER JOIN hm_tutor_profile B ON (A.tutorProfileId = B.id AND B.userId = ?)`,
    [userId]
  );
};

export const getTutorQualifications = async (userId) => {
  return executeQuery(
    `SELECT A.id, A.subjectName, A.description, A.grade 
     FROM hm_qualification A
     INNER JOIN hm_tutor_profile B ON (A.tutorProfileId = B.id AND B.userId = ?)`,
    [userId]
  );
};

export const getTutorReviews = async (userId) => {
  return executeQuery(
    `SELECT A.id, A.text, A.rating, A.createdDateTime, A.modifiedDateTime, 
            U.firstName, U.lastName, A.userId 
     FROM hm_review A
     INNER JOIN hm_user U ON (A.userId = U.id)
     INNER JOIN hm_tutor_profile T ON (A.tutorProfileId = T.id AND T.userId = ?)`,
    [userId]
  );
};

export const getTutorsByStatusFilter = async (status) => {
  let query = `SELECT T.*, U.firstName, U.lastName, U.email, U.gender 
               FROM hm_tutor_profile T 
               INNER JOIN hm_user U ON (T.userId = U.id)`;
  
  const queryParams = [];
  if (status && ["100", "101", "102"].includes(status)) {
    query += " WHERE T.status = ?";
    queryParams.push(status);
  }

  return executeQuery(query, queryParams);
};

export const searchTutorProfiles = async (searchParams) => {
  const conditions = [];
  const { TutorProfileId, Status, maxRatePerHour, SubjectName, level, gender } = searchParams;

  if (TutorProfileId) conditions.push(`id = ${database.escape(TutorProfileId)}`);
  if (Status) conditions.push(`status = ${database.escape(Status)}`);
  if (maxRatePerHour) conditions.push(`ratePerHour <= ${database.escape(maxRatePerHour)}`);
  if (SubjectName) conditions.push(`MATCH(subjectName) AGAINST (${database.escape(`*${SubjectName}*`)} IN BOOLEAN MODE)`);
  if (level) conditions.push(`level = ${database.escape(level)}`);
  if (gender) conditions.push(`gender = ${database.escape(gender)}`);

  const baseQuery = `
    SELECT hm_tutor_profile.userId as userId, hm_post.id, hm_post.description, 
           hm_post.tutorProfileId, hm_post.status, hm_post.language, 
           hm_post.subjectName, hm_post.ratePerHour, hm_post.experienceYears, 
           hm_post.availableTime, hm_user.firstName, hm_user.lastName, 
           hm_tutor_profile.picPath, hm_tutor_profile.about 
    FROM hm_post
    INNER JOIN hm_tutor_profile ON (hm_tutor_profile.id = hm_post.tutorProfileId 
                                   AND hm_tutor_profile.status = 101)
    INNER JOIN hm_user ON (hm_user.id = hm_tutor_profile.userId)
    ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}`;

  return executeQuery(baseQuery);
};

export const updateTutorProfile = async (profileData) => {
  const { userId, about, age, picturePath } = profileData;
  const updates = [];
  const values = [];

  if (picturePath) {
    await executeQuery(
      "UPDATE hm_tutor_profile SET picPath = ?, status = 100 WHERE userId = ?",
      [picturePath, userId]
    );
  }

  if (about) {
    updates.push("about = ?");
    values.push(about);
  }

  if (age) {
    updates.push("age = ?");
    values.push(age);
  }

  if (updates.length > 0) {
    updates.push("status = 100");
    values.push(userId);

    const query = `UPDATE hm_tutor_profile SET rating = 0, ${updates.join(", ")} WHERE userId = ?`;
    return executeQuery(query, values);
  }

  return null;
};

export const updateTutorStatus = async (userId, status) => {
  return executeQuery(
    "UPDATE hm_tutor_profile SET status = ? WHERE userId = ?",
    [status, userId]
  );
}; 