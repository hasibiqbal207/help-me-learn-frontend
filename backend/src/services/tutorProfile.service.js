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
    `SELECT subjectName, ratePerHour, description, experienceYears, availableTime, language, status 
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
  try {
    const conditions = [];
    const queryParams = [];
    const { TutorProfileId, status, maxRatePerHour, SubjectName, level, gender } = searchParams;

    console.log("Searching with parameters:", searchParams);

    // Build WHERE conditions with parameterized queries for improved security
    if (TutorProfileId) {
      conditions.push("hm_tutor_profile.id = ?");
      queryParams.push(TutorProfileId);
    }
    
    if (status) {
      conditions.push("hm_post.status = ?");
      queryParams.push(status);
    } else {
      // Default to showing only approved posts (status 101)
      conditions.push("hm_post.status = 101");
    }
    
    if (maxRatePerHour) {
      conditions.push("hm_post.ratePerHour <= ?");
      queryParams.push(maxRatePerHour);
    }
    
    if (SubjectName && SubjectName.trim() !== '') {
      // Using LIKE for better partial matching
      conditions.push("hm_post.subjectName LIKE ?");
      queryParams.push(`%${SubjectName}%`);
    }
    
    // Note: 'level' field isn't in the database schema, so we'll skip it
    // but keep it in the function signature for backwards compatibility
    
    if (gender && gender !== '%') {
      conditions.push("hm_user.gender = ?");
      queryParams.push(gender);
    }

    const baseQuery = `
      SELECT 
        hm_tutor_profile.userId as userId, 
        hm_tutor_profile.id as tutorProfileId,
        hm_post.id, 
        hm_post.description, 
        hm_post.status, 
        hm_post.language, 
        hm_post.subjectName, 
        hm_post.ratePerHour, 
        hm_post.experienceYears, 
        hm_post.availableTime, 
        hm_user.firstName, 
        hm_user.lastName, 
        hm_user.gender,
        hm_tutor_profile.picPath, 
        hm_tutor_profile.about 
      FROM hm_post
      INNER JOIN hm_tutor_profile ON (hm_tutor_profile.id = hm_post.tutorProfileId)
      INNER JOIN hm_user ON (hm_user.id = hm_tutor_profile.userId)
      ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
      ORDER BY hm_user.firstName, hm_user.lastName`;
    
    return executeQuery(baseQuery, queryParams);
  } catch (error) {
    console.error("Error in searchTutorProfiles:", error);
    throw error;
  }
};

export const updateTutorProfile = async (profileData) => {
  try {
    const { userId, picturePath, about, age } = profileData;
    
    // Validate about text length
    if (about && about.length > 250) {
      console.log("About text exceeds maximum length of 250 characters");
      return { 
        success: false, 
        message: "About text exceeds maximum length of 250 characters"
      };
    }
    
    if (picturePath) {
      console.log("Updating profile picture:", picturePath);
      await executeQuery(
        "UPDATE hm_tutor_profile SET picPath = ? WHERE userId = ?",
        [picturePath, userId]
      );
    }
    
    // Build the updates for about and age fields
    const updates = [];
    const values = [];
    
    if (about !== undefined) {
      updates.push("about = ?");
      values.push(about);
      console.log("Will update about field to:", about);
    }
    
    if (age !== undefined) {
      updates.push("age = ?");
      values.push(age);
      console.log("Will update age field to:", age);
    }
    
    // Only proceed with additional updates if there are fields to update
    if (updates.length > 0) {
      values.push(userId);
      
      const query = `UPDATE hm_tutor_profile SET ${updates.join(", ")} WHERE userId = ?`;
      console.log("Final update query:", query);
      console.log("Values for query:", values);
      
      return executeQuery(query, values);
    }
    
    return { message: "No fields to update" };
  } catch (error) {
    console.error("Error in updateTutorProfile:", error);
    throw error;
  }
};

export const updateTutorStatus = async (userId, status) => {
  return executeQuery(
    "UPDATE hm_tutor_profile SET status = ? WHERE userId = ?",
    [status, userId]
  );
}; 