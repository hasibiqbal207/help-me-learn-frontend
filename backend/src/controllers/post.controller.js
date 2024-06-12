import database from "../../database.js";

import { validationResult } from "express-validator";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let {
    Description,
    Status,
    Language,
    SubjectName,
    RatePerHour,
    Level,
    ExperinceYears,
    AvailableTime,
    UserId,
  } = req.body;

  var date = new Date().toISOString().split("T")[0];
  var isActive = true;

  try {
    let result = await executeQuery(
      "SELECT * FROM hm_tutor_profile T WHERE T.userId = ?;",
      [UserId]
    );
    let tutorProfileId = result[0].id;
    result = await executeQuery(
      "INSERT INTO hm_post(level, description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        Level,
        Description,
        tutorProfileId,
        Status,
        Language,
        SubjectName,
        RatePerHour,
        date,
        date,
        ExperinceYears,
        isActive,
        AvailableTime,
      ]
    );

    var postId = result.insertId;

    await executeQuery(
      "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?;",
      [tutorProfileId]
    );

    res.status(201).json({ message: `Post Id: ${postId}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  let id = req.params.id;
  database.query("DELETE FROM hm_post WHERE id = ?;", [id], (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else
      res.status(200).json({ message: `Post Id:${id} deleted successfully.` });
  });
};

export const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let {
    Id,
    Description,
    TutorProfileId,
    Status,
    Language,
    SubjectName,
    RatePerHour,
    ExperinceYears,
    AvailableTime,
  } = req.body;

  var date = new Date().toISOString().split("T")[0];
  database.query(
    "UPDATE hm_post SET description=?, tutorProfileId=?, status=?, `language`=?, subjectName=?, ratePerHour=?, modifiedDateTime=?, experienceYears=?, availableTime=? WHERE id = ?;",
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
      Id,
    ],
    (err, result) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(204).json({ message: "Post Details Updated" });
    }
  );
};

export const getPost = async (req, res) => {
  let id = req.params.id;
  database.query(
    "SELECT id, description, tutorProfileId, status, `language`, subjectName, ratePerHour, createdDateTime, modifiedDateTime, experienceYears, isActive, availableTime FROM hm_post WHERE id = ?;",
    [id],
    (err, result) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};

export const searchPost = async (req, res) => {
  let joinQuery = "";
  if (req.query.TutorProfileId !== undefined) {
    joinQuery += `tutorProfileId = ${database.escape(
      req.query.TutorProfileId
    )}`;
  }

  if (req.query.Status !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `status = ${database.escape(req.query.Status)}`;
  }

  if (req.query.RatePerHour !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `ratePerHour = ${database.escape(req.query.RatePerHour)}`;
  }

  if (req.query.SubjectName !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `MATCH(subjectName) AGAINST (${database.escape(
      req.query.SubjectName
    )})`;
  }

  let dbQuery =
    "SELECT hm_post.id, hm_post.description, hm_post.tutorProfileId, hm_post.status, hm_post.language, hm_post.subjectName, hm_post.ratePerHour, hm_post.createdDateTime, hm_post.modifiedDateTime, hm_post.experienceYears, hm_post.isActive, hm_post.availableTime, hm_user.firstName, hm_user.lastName FROM hm_post" +
    " INNER JOIN hm_tutor_profile ON (hm_tutor_profile.id = hm_post.tutorProfileId)" +
    " INNER JOIN hm_user ON (hm_user.id = hm_tutor_profile.userId)";
  if (joinQuery !== "") dbQuery += ` where ${joinQuery}`;

  database.query(dbQuery, (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
};
