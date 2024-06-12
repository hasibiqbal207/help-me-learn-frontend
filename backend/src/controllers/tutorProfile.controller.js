import database from "../../database.js";

import uploadFile from "../utils/upload.js";

import { validationResult } from "express-validator";
import dotenv from "dotenv";
import util from "util";

dotenv.config();


const executeQuery = util.promisify(database.query).bind(database);

export const getTutorAbouInfoById = async (req, res) => {
  let id = req.params.id;
  let query = `SELECT firstName, lastName, about, age, picPath FROM hm_tutor_profile A, hm_user B WHERE A.userId = B.id AND userId = ?`;

  database.query(query, [id], (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
};

export const getTutorOfferedCoursesById = async (req, res) => {
  let id = req.params.id;
  let query = `SELECT subjectName, ratePerHour, description, experienceYears, availableTime, language, level FROM hm_post A inner join hm_tutor_profile B on
    (A.tutorProfileId = B.id and B.userId = ?);`;
  console.log(query);
  database.query(query, [id], (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
};

export const getTutorQualificationById = async (req, res) => {
  let id = req.params.id;
  let query = `SELECT A.id, A.subjectName, A.description, A.grade FROM hm_qualification A
     inner join hm_tutor_profile B on (A.tutorProfileId = B.id and B.userId = ?);`;

  database.query(query, [id], (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
};

export const getReviewsById = async (req, res) => {
  let id = req.params.id;
  try {
    let result = await executeQuery(
      `SELECT A.id, A.text, A.rating, A.createdDateTime, A.modifiedDateTime, U.firstName, U.lastName, A.userId FROM hm_review A
      inner join hm_user U on (A.userId = U.id)
      inner join hm_tutor_profile T on (A.tutorProfileId = T.id and T.userId = ?);`,
      [id]
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTutorsByStatus = async (req, res) => {
  let status = req.query.status;

  try {
    let query =
      "SELECT T.*, U.firstName, U.lastName, U.email, U.gender FROM hm_tutor_profile T INNER JOIN hm_user U ON (T.userId = U.id)";
    let queryParams = [];
    if (status != undefined && ["100", "101", "102"].some((x) => x == status)) {
      query = query + " WHERE T.status = ?";
      queryParams.push(status);
    } else {
      query = query + ";";
    }

    let result = await executeQuery(query, queryParams);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const searchTutorProfile = async (req, res) => {
  let joinQuery = "";
  if (req.query.TutorProfileId !== undefined) {
    joinQuery += `id = ${database.escape(req.query.TutorProfileId)}`;
  }

  if (req.query.Status !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `status = ${database.escape(req.query.Status)}`;
  }

  if (req.query.maxRatePerHour !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `ratePerHour <= ${database.escape(req.query.maxRatePerHour)}`;
  }

  if (req.query.SubjectName !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `MATCH(subjectName) AGAINST (${database.escape(
      `*${req.query.SubjectName}*`
    )} IN BOOLEAN MODE)`;
  }

  if (req.query.level) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `level = ${database.escape(req.query.level)}`;
  }

  if (req.query.gender) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `gender = ${database.escape(req.query.gender)}`;
  }

  let dbQuery =
    "SELECT hm_tutor_profile.userId as userId, hm_post.id, hm_post.description, hm_post.tutorProfileId, hm_post.status, hm_post.language, hm_post.subjectName, hm_post.ratePerHour, hm_post.experienceYears, hm_post.availableTime, hm_user.firstName, hm_user.lastName, hm_tutor_profile.picPath, hm_tutor_profile.about FROM hm_post" +
    " INNER JOIN hm_tutor_profile ON (hm_tutor_profile.id = hm_post.tutorProfileId and hm_tutor_profile.status = 101)" +
    " INNER JOIN hm_user ON (hm_user.id = hm_tutor_profile.userId)";
  if (joinQuery !== "") dbQuery += ` where ${joinQuery}`;
  console.log(dbQuery);
  database.query(dbQuery, (err, input) => {
    if (err) console.log(err);
    else {
      /**
       * [
       *  {
       *    tutorId
       *    tutorName
       *    picPath
       *    posts: [
       *      {
       *        id,
       *        description
       *        subjectName
       *        ratePerHour
       *      }
       *    ]
       *  }
       * ]
       */
      result = [];
      input.forEach((item) => {
        var tutor = result.find((x) => x.tutorId == item.tutorProfileId);
        if (tutor === undefined) {
          tutor = {
            userId: item.userId,
            tutorId: item.tutorProfileId,
            tutorFirstName: item.firstName,
            tutorLastName: item.lastName,
            picPath: item.picPath,
            about: item.about,
            posts: [],
          };
          result.push(tutor);
        }

        tutor.posts.push({
          id: item.id,
          description: item.description,
          status: item.status,
          language: item.language,
          ratePerHour: item.ratePerHour,
          subjectName: item.subjectName,
          availableTime: item.availableTime,
          experienceYears: item.experienceYears,
        });
      });

      res.json(result);
    }
  });
};

export const saveTutorInfo = async (req, res) => {
  await uploadFile(req, res);

  let { UserId, About, Age } = req.body;

  if (req.file) {
    let PicturePath = "public/images/" + req.file.originalname;

    await executeQuery(
      "UPDATE hm_tutor_profile SET picPath = ?, status = 100 WHERE userId = ?",
      [PicturePath, UserId]
    );
  }

  var queryParams = [];
  var query = "UPDATE hm_tutor_profile SET rating = 0";

  if (About) {
    queryParams.push(About);
    query += ", about = ?";
  }

  if (Age) {
    queryParams.push(Age);
    query += ", age = ?";
  }

  if (queryParams.length > 0) {
    query += ", status = 100 WHERE userId = ?";
    queryParams.push(UserId);
  }

  await executeQuery(query, queryParams);

  res.status(200).json({ message: "Tutor profile updated" });
};

export const updateTutorInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { UserId, Status } = req.body;
  database.query(
    `UPDATE hm_tutor_profile SET status = ? WHERE userId = ?`,
    [Status, UserId],
    (err) => {
      if (err) {
        res.status(500).json({ message: error });
      } else {
        res.json({ message: "Tutor Profile Updated" });
      }
    }
  );
};
