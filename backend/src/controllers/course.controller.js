import database from "../../database.js";

import { validationResult } from "express-validator";

// Create Course Method
export const createCourse = async (req, res) => {
  // Validate Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { CourseCode, CourseName, DeptId, Level } = req.body;
  let Status = 100;

  database.query(
    "INSERT INTO hm_course (courseCode, courseName, departmentId, `level`, status) VALUES ( ?, ?, ?, ?, ?)",
    [CourseCode, CourseName, DeptId, Level, Status],
    (err) => {
      if (err) res.status(400).send(`Request Error: ${err}`);
    }
  );

  // Get Course Id
  database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
    if (err)
      res
        .status(400)
        .send(
          `Successfully added Course, but unable get record Id. Request Error: ${err}`
        );
    else res.status(201).json({ message: `Course Id: ${result[0].id}` });
  });
};

// Get Courses Method
export const getCourses = async (req, res) => {
  let joinQuery = "";
  if (req.query.Status !== undefined) {
    joinQuery += `status = ${database.escape(req.query.Status)}`;
  }

  let dbQuery =
    "SELECT id, courseCode, courseName, departmentId, `level`, status FROM hm_course";
  if (joinQuery !== "") dbQuery += ` where ${joinQuery}`;
  database.query(dbQuery, (err, result) => {
    if (err) res.status(400).send(`Request Error: ${err}`);
    else res.status(200).json(result);
  });
};

// Get Course By Id Method
export const getCourseById = async (req, res) => {
  // Query
  database.query(
    "SELECT id, courseCode, courseName, departmentId, `level`, status FROM hm_course WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) res.status(400).send(`Request Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};

// Delete Course By Id Method
export const deleteCourse = async (req, res) => {
  let id = req.params.id;
  database.query(`DELETE FROM hm_course WHERE id = ?;`, [id], (err, result) => {
    if (err) res.status(400).send(`Request Error: ${err}`);
    else
      res
        .status(200)
        .json({ message: `Course Id:${id} deleted successfully.` });
  });
};

// Update Course
export const updateCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { Id, CourseCode, CourseName, DeptId, Level, Status } = req.body;
  var date = new Date().toISOString().split("T")[0];

  database.query(
    "UPDATE hm_course SET courseCode = ?, courseName = ?, departmentId = ?, `level` = ?, status = ? WHERE id = ?",
    [CourseCode, CourseName, DeptId, Level, Status, Id],
    (err) => {
      if (err) res.status(400).send(`Request Error: ${err}`);
      else {
        res.status(204).json({ message: "Course Details Updated" });
      }
    }
  );
};
