import database from "../../config/database.js";

import { validationResult } from "express-validator";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createUserFeedback = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { Subject, Description, UserId } = req.body;
  var date = new Date();

  database.query(
    "INSERT INTO hm_feedback(subject, description, createdDateTime, userId) VALUES ( ?, ?, ?, ?)",
    [Subject, Description, date, UserId],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
    }
  );

  database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
    if (err)
      res
        .status(400)
        .send(
          `Successfully added Feedback, but unable get record Id. Request Error: ${err}`
        );
    else res.status(201).json({ message: `Feedback Id: ${result[0].id}` });
  });
};

export const getFeedbacks = async (req, res) => {
  database.query(
    "SELECT id, subject, description FROM hm_feedback",
    (err, result) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};

export const getFeedbackById = async (req, res) => {
  database.query(
    "SELECT id, subject, description FROM hm_feedback WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) res.status(400).send(`Request Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};
