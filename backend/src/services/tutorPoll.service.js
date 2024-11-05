import database from "../../config/database.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createNewPoll = async (pollData) => {
  const { CourseName, Description, Level, TutorProfileId } = pollData;
  
  return executeQuery(
    "INSERT INTO hm_poll (coursename, description, level, tutorProfileId) VALUES (?, ?, ?, ?)",
    [CourseName, Description, Level, TutorProfileId]
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
    Id, 
    Description, 
    TutorProfileId, 
    Status, 
    Language, 
    SubjectName, 
    RatePerHour, 
    ExperinceYears, 
    AvailableTime,
    date 
  } = pollData;

  return executeQuery(
    "UPDATE hm_post SET description=?, tutorProfileId=?, status=?, `language`=?, subjectName=?, ratePerHour=?, modifiedDateTime=?, experienceYears=?, availableTime=? WHERE id = ?",
    [
      Description,
      TutorProfileId,
      Status,
      Language,
      SubjectName,
      RatePerHour,
      date,
      ExperinceYears,
      AvailableTime,
      Id
    ]
  );
}; 