import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileByUserId = async (userId) => {
  return executeQuery("SELECT * FROM hm_tutor_profile T WHERE T.userId = ?;", [
    userId,
  ]);
};

export const createNewPost = async (postData) => {
  const {
    description,
    status,
    language,
    subjectName,
    ratePerHour,
    experienceYears,
    availableTime,
    tutorProfileId,
    date,
    isActive,
  } = postData;

  return executeQuery(
    "INSERT INTO hm_post(description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      description,
      tutorProfileId,
      status,
      language,
      subjectName,
      ratePerHour,
      date,
      date,
      experienceYears,
      isActive,
      availableTime,
    ]
  );
};

export const updateTutorStatus = async (tutorProfileId) => {
  return executeQuery(
    "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?;",
    [tutorProfileId]
  );
};

export const deletePostById = async (id) => {
  return executeQuery("DELETE FROM hm_post WHERE id = ?;", [id]);
};

export const updatePostById = async (postData) => {
  const { id, ...fields } = postData;
  
  // Validate that id exists
  if (!id) {
    throw new Error('Post ID is required for update operation');
  }

  // Build dynamic query based on available fields
  const fieldUpdates = [];
  const values = [];

  // Add each existing field to the update query
  if (fields.description !== undefined) {
    fieldUpdates.push('description=?');
    values.push(fields.description);
  }
  
  if (fields.tutorProfileId !== undefined) {
    fieldUpdates.push('tutorProfileId=?');
    values.push(fields.tutorProfileId);
  }
  
  if (fields.status !== undefined) {
    fieldUpdates.push('status=?');
    values.push(fields.status);
  }
  
  if (fields.language !== undefined) {
    fieldUpdates.push('`language`=?');
    values.push(fields.language);
  }
  
  if (fields.subjectName !== undefined) {
    fieldUpdates.push('subjectName=?');
    values.push(fields.subjectName);
  }
  
  if (fields.ratePerHour !== undefined) {
    fieldUpdates.push('ratePerHour=?');
    values.push(fields.ratePerHour);
  }
  
  if (fields.date !== undefined) {
    fieldUpdates.push('modifiedDateTime=?');
    values.push(fields.date);
  }
  
  if (fields.experienceYears !== undefined) {
    fieldUpdates.push('experienceYears=?');
    values.push(fields.experienceYears);
  }
  
  if (fields.availableTime !== undefined) {
    fieldUpdates.push('availableTime=?');
    values.push(fields.availableTime);
  }
  
  // Add current timestamp for modifiedDateTime if not provided
  if (!fields.date) {
    fieldUpdates.push('modifiedDateTime=?');
    values.push(new Date());
  }
  
  // If no fields to update, return early
  if (fieldUpdates.length === 0) {
    return { affectedRows: 0, message: "No fields to update" };
  }
  
  // Add the id to the values array for the WHERE clause
  values.push(id);
  
  // Construct the final query
  const query = `UPDATE hm_post SET ${fieldUpdates.join(', ')} WHERE id = ?;`;
  
  return executeQuery(query, values);
};

export const getPostById = async (id) => {
  return executeQuery(
    "SELECT id, description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime FROM hm_post WHERE id = ?;",
    [id]
  );
};

export const searchPosts = async (queryParams) => {
  let joinQuery = "";
  const { tutorProfileId, status, ratePerHour, subjectName } = queryParams;

  if (tutorProfileId !== undefined) {
    joinQuery += `hm_post.tutorProfileId = ${database.escape(tutorProfileId)}`;
  }

  if (status !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `hm_post.status = ${database.escape(status)}`;
  }

  if (ratePerHour !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `hm_post.ratePerHour = ${database.escape(ratePerHour)}`;
  }

  if (subjectName !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `MATCH(hm_post.subjectName) AGAINST (${database.escape(subjectName)})`;
  }

  let dbQuery =
    "SELECT hm_post.id, hm_post.description, hm_post.tutorProfileId, hm_post.status, hm_post.language, hm_post.subjectName, hm_post.ratePerHour, hm_post.createdDateTime, hm_post.modifiedDateTime, hm_post.experienceYears, hm_post.isActive, hm_post.availableTime, hm_user.firstName, hm_user.lastName FROM hm_post" +
    " INNER JOIN hm_tutor_profile ON (hm_tutor_profile.id = hm_post.tutorProfileId)" +
    " INNER JOIN hm_user ON (hm_user.id = hm_tutor_profile.userId)";
  
  if (joinQuery !== "") {
    dbQuery += ` where ${joinQuery}`;
  }

  return executeQuery(dbQuery);
};
