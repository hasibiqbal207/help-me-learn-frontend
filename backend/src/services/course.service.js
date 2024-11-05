import database from "../../config/database.js";

export const insertCourse = async (courseData) => {
  const { CourseCode, CourseName, DeptId, Level, Status } = courseData;
  
  return new Promise((resolve, reject) => {
    database.query(
      "INSERT INTO hm_course (courseCode, courseName, departmentId, `level`, status) VALUES ( ?, ?, ?, ?, ?)",
      [CourseCode, CourseName, DeptId, Level, Status],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const getLastInsertId = async () => {
  return new Promise((resolve, reject) => {
    database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
      if (err) reject(err);
      resolve(result[0].id);
    });
  });
};

export const getAllCourses = async (status) => {
  let query = "SELECT id, courseCode, courseName, departmentId, `level`, status FROM hm_course";
  if (status !== undefined) {
    query += ` where status = ${database.escape(status)}`;
  }

  return new Promise((resolve, reject) => {
    database.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const getCourseById = async (courseId) => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT id, courseCode, courseName, departmentId, `level`, status FROM hm_course WHERE id = ?",
      [courseId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const deleteCourseById = async (courseId) => {
  return new Promise((resolve, reject) => {
    database.query(
      "DELETE FROM hm_course WHERE id = ?;",
      [courseId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const updateCourseById = async (courseData) => {
  const { id, courseCode, courseName, deptId, level, status } = courseData;
  
  return new Promise((resolve, reject) => {
    database.query(
      "UPDATE hm_course SET courseCode = ?, courseName = ?, departmentId = ?, `level` = ?, status = ? WHERE id = ?",
      [courseCode, courseName, deptId, level, status, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}; 