const database = require("../database");

export const deleteUser = (req, res, next) => {
  let userName = req.query.username;
  try {
    database.execute(
      "DELETE FROM `helpmelearn`.`hm_user` WHERE (`username` = ?)",
      [userName],
      (err, result) => {
        res.json({ success: true, message: "User deleted succesfully!" });
      }
    );
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
};