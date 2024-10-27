import database from "../../config/database.js";

import dotenv from "dotenv";

dotenv.config();

export const file = async (req, res) => {
  let id = req.params.id;
  database.execute(
    "SELECT F.* FROM hm_file F INNER JOIN hm_tutor_profile T on (F.tutorProfileId = T.id and T.userId = ?);",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
      } else {
        res.send({ message: "Success", data: result });
      }
    }
  );
};

export const image = async (req, res) => {
  database.execute(
    "SELECT * FROM `helpmelearn`.`hm_image` WHERE `userId`= ?",
    [req.userid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
      } else {
        res.send({ message: "Success", data: result });
      }
    }
  );
};
