import database from "../../config/database.js";

import { validationResult } from "express-validator";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { Text, Rating, UserId, TutorProfileId } = req.body;
  var date = new Date();

  let result = await executeQuery(
    "SELECT id from hm_tutor_profile WHERE userId = ?;",
    [TutorProfileId]
  );
  if (result.length == 0) {
    res
      .status(400)
      .json({ message: `No tutor found with ID: ${TutorProfileId}` });
    return;
  }
  TutorProfileId = result[0].id;
  database.query(
    "INSERT INTO hm_review (`text`, rating, createdDateTime, modifiedDateTime, userId, tutorProfileId) VALUES ( ?, ?, ?, ?, ?, ?)",
    [Text, Rating, date, date, UserId, TutorProfileId],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
    }
  );

  database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
    if (err)
      res
        .status(400)
        .send(
          `Successfully added Department, but unable get record Id. Request Error: ${err}`
        );
    else res.status(201).json({ message: `Review Id: ${result[0].id}` });
  });
};

export const getReviewById = async (req, res) => {
  let id = req.params.tutorProfileId;
  let query = `SELECT hmu.firstName, hmu.lastName, hmr.text, hmr.rating, hmr.createdDateTime FROM helpmelearn.hm_review hmr
     inner join helpmelearn.hm_user hmu on (hmr.userId = hmu.id and hmr.tutorProfileId = ?);`;

  database.query(query, [id], (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else res.json(result);
  });
};

export const getReviews = async (req, res) => {
  let joinQuery = "";
  if (req.query.TutorProfileId !== undefined)
    joinQuery += `tutorProfileId = ${database.escape(
      req.query.TutorProfileId
    )}`;

  if (req.query.UserId !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `userId = ${database.escape(req.query.UserId)}`;
  }

  let query =
    "SELECT id, `text`, rating, createdDateTime, modifiedDateTime, userId, tutorProfileId FROM helpmelearn.hm_review";
  if (joinQuery !== "") query += ` where ${joinQuery}`;
  database.query(query, (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else res.status(200).json(result);
  });
};

export const deleteReview = async (req, res) => {
  let id = req.params.id;
  database.query("DELETE FROM hm_review WHERE id = ?;", [id], (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else
      res
        .status(200)
        .json({ message: `Review Id:${id} deleted successfully.` });
  });
};

export const updateReview = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { Id, Text, Rating, UserId, TutorProfileId } = req.body;
  var date = new Date().toISOString().split("T")[0];

  database.query(
    `UPDATE hm_review SET text=?, rating=?, modifiedDateTime=?, userId=?, tutorProfileId=? WHERE id = ?`,
    [Text, Rating, date, UserId, TutorProfileId, Id],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(204).json({ message: "Review Details Updated" });
    }
  );
};
