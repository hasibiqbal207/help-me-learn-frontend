import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getTutorFiles = async (userId) => {
  return executeQuery(
    "SELECT F.* FROM hm_file F INNER JOIN hm_tutor_profile T on (F.tutorProfileId = T.id and T.userId = ?);",
    [userId]
  );
};

export const getUserImages = async (userId) => {
  return executeQuery(
    "SELECT * FROM `helpmelearn`.`hm_image` WHERE `userId`= ?",
    [userId]
  );
}; 