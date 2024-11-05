import database from "../../config/database.js";

export const removeUserFromDatabase = async (username) => {
  return new Promise((resolve, reject) => {
    database.execute(
      "DELETE FROM `helpmelearn`.`hm_user` WHERE (`username` = ?)",
      [username],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}; 