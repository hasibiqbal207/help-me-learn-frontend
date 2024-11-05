import database from "../../config/database.js";

export const insertDepartment = async (name) => {
  return new Promise((resolve, reject) => {
    database.query(
      "INSERT INTO hm_department (name) VALUES (?)",
      [name],
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

export const getAllDepartments = async () => {
  return new Promise((resolve, reject) => {
    database.query("SELECT id, name FROM hm_department", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const getDepartmentById = async (id) => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT id, name FROM hm_department WHERE id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const deleteDepartmentById = async (id) => {
  return new Promise((resolve, reject) => {
    database.query(
      "DELETE FROM hm_department WHERE id = ?;",
      [id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const updateDepartmentById = async (id, name) => {
  return new Promise((resolve, reject) => {
    database.query(
      "UPDATE hm_department SET name = ? WHERE id = ?",
      [name, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}; 