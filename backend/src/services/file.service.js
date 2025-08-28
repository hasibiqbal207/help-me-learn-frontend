import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorFiles = async (userId) => {
  console.log("Executing getTutorFiles query for userId:", userId);
  try {
    const query = "SELECT F.* FROM hm_file F INNER JOIN hm_tutor_profile T on (F.tutorProfileId = T.id and T.userId = ?)";
    console.log("Query:", query);
    
    const result = await executeQuery(query, [userId]);
    console.log("Query result length:", result.length);
    
    return result;
  } catch (error) {
    console.error("Error in getTutorFiles:", error);
    throw error;
  }
};

export const getUserImages = async (userId) => {
  return executeQuery(
    "SELECT * FROM `helpmelearn`.`hm_image` WHERE `userId`= ?",
    [userId]
  );
}; 