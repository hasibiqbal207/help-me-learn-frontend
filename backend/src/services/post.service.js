import database from "../../config/database.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorProfileByUserId = async (userId) => {
  return executeQuery(
    "SELECT * FROM hm_tutor_profile T WHERE T.userId = ?;",
    [userId]
  );
};

export const createNewPost = async (postData) => {
  const {
    Level,
    Description,
    tutorProfileId,
    Status,
    Language,
    SubjectName,
    RatePerHour,
    date,
    ExperinceYears,
    isActive,
    AvailableTime
  } = postData;

  return executeQuery(
    "INSERT INTO hm_post(level, description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      Level,
      Description,
      tutorProfileId,
      Status,
      Language,
      SubjectName,
      RatePerHour,
      date,
      date,
      ExperinceYears,
      isActive,
      AvailableTime,
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
  const {
    description,
    tutorProfileId,
    status,
    language,
    subjectName,
    ratePerHour,
    date,
    experienceYears,
    availableTime,
    id
  } = postData;

  return executeQuery(
    "UPDATE hm_post SET description=?, tutorProfileId=?, status=?, `language`=?, subjectName=?, ratePerHour=?, modifiedDateTime=?, experienceYears=?, availableTime=? WHERE id = ?;",
    [
      description,
      tutorProfileId,
      status,
      language,
      subjectName,
      ratePerHour,
      date,
      experienceYears,
      availableTime,
      id,
    ]
  );
};

export const getPostById = async (id) => {
  return executeQuery(
    "SELECT id, description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime FROM hm_post WHERE id = ?;",
    [id]
  );
};

export const searchPosts = async (queryParams) => {
  let joinQuery = "";
  const { TutorProfileId, Status, RatePerHour, SubjectName } = queryParams;

  if (TutorProfileId !== undefined) {
    joinQuery += `tutorProfileId = ${database.escape(TutorProfileId)}`;
  }

  if (Status !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `status = ${database.escape(Status)}`;
  }

  if (RatePerHour !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `ratePerHour = ${database.escape(RatePerHour)}`;
  }

  if (SubjectName !== undefined) {
    if (joinQuery !== "") joinQuery += " and ";
    joinQuery += `MATCH(subjectName) AGAINST (${database.escape(SubjectName)})`;
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