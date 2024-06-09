let database = require("../database");
const { validationResult } = require("express-validator");
const util = require("util");

const executeQuery = util.promisify(database.query).bind(database);

// Get Qualification By Id Method
export const getQualificationById = async (req, res) => {
  // Query
  database.query(
    "SELECT * FROM hm_qualification WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) res.status(400).send(`Request Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};

export const createQualification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { SubjectName, Description, Grade, UserId } = req.body;

  try {
    var result = await executeQuery(
      "SELECT * FROM hm_tutor_profile T WHERE T.userId = ?",
      [UserId]
    );

    var tutorProfileId = result[0].id;

    result = await executeQuery(
      `INSERT INTO hm_qualification (subjectName, description, grade, tutorProfileId) VALUES ( ?, ?, ?, ?);`,
      [SubjectName, Description, Grade, tutorProfileId]
    );
    let qualificationId = result.insertId;

    await executeQuery(
      "UPDATE hm_tutor_profile SET status = 100 WHERE id = ?;",
      [tutorProfileId]
    );

    res.json({ message: `Qualification Id: ${qualificationId}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getQualificationByTutorProfileId = async (req, res) => {
  database.query(
    "SELECT id, subjectName, description, grade FROM hm_qualification WHERE tutorProfileId = ?",
    [req.params.tutorProfileId],
    (err, result) => {
      if (err) console.log(err);
      else res.json(result);
    }
  );
};

export const deleteQualification = async (req, res) => {
  let id = req.params.id;
  database.query(
    `DELETE FROM hm_qualification WHERE id = ?;`,
    [id],
    (err, result) => {
      res.json({ message: `Qualification Id:${id} deleted successfully.` });
    }
  );
};

export const updateQualification = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { SubjectName, Qualification, Grade } = req.body;

  database.query(
    `UPDATE hm_qualification SET subjectName = ?, description= ?, grade = ? WHERE id = ?`,
    [SubjectName, Qualification, Grade, Id],
    (err) => {
      if (err) console.log(err);
      else {
        res.json({ message: "Qualification Updated" });
      }
    }
  );
};
