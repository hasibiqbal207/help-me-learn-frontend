import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createNewPoll = async (pollData) => {
  const { courseName, description, level, tutorProfileId } = pollData;
  
  return executeQuery(
    "INSERT INTO hm_poll (coursename, description, level, tutorProfileId) VALUES (?, ?, ?, ?)",
    [courseName, description, level, tutorProfileId]
  );
};

export const deletePollById = async (id) => {
  return executeQuery(
    "DELETE FROM hm_poll WHERE id = ?",
    [id]
  );
};

export const getPollsByTutorId = async (tutorProfileId) => {
  return executeQuery(
    "SELECT * FROM hm_poll WHERE tutorProfileId = ? ORDER BY id DESC",
    [tutorProfileId]
  );
};

export const updatePollById = async (pollData) => {
  const { 
    id, 
    description, 
    tutorProfileId, 
    status, 
    language, 
    subjectName, 
    ratePerHour, 
    experienceYears, 
    availableTime,
    date 
  } = pollData;

  return executeQuery(
    "UPDATE hm_poll SET description=?, tutorProfileId=?, status=?, `language`=?, subjectName=?, ratePerHour=?, modifiedDateTime=?, experienceYears=?, availableTime=? WHERE id = ?",
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
      id
    ]
  );
}; 