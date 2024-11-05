import database from "../../config/database.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const getUserStatistics = async () => {
  return executeQuery(`
    SELECT 
      COUNT(IF(a.status = 100, 1, NULL)) as pending,
      COUNT(IF(a.status = 101, 1, NULL)) as approved,
      COUNT(IF(a.status = 102, 1, NULL)) as rejected,
      COUNT(IF(a.usertype = 101, 1, NULL)) as tutorCount,
      COUNT(IF(a.usertype = 102, 1, NULL)) as studentCount
    FROM helpmelearn.hm_user a;
  `);
};

export const getPostStatistics = async () => {
  return executeQuery(`
    SELECT 
      COUNT(IF(a.status = 100, 1, NULL)) as pending,
      COUNT(IF(a.status = 101, 1, NULL)) as approved,
      COUNT(IF(a.status = 102, 1, NULL)) as rejected
    FROM helpmelearn.hm_tutor_profile a;
  `);
}; 