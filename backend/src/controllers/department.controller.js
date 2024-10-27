import database from "../../config/database.js";

import { validationResult } from "express-validator";
// Create Department Method

export const createDepartment = async (req, res) => {
  // Validate Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { Name } = req.body;
  database.query(
    "INSERT INTO hm_department (name) VALUES ( ? )",
    [Name],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
    }
  );

  // Get Department Id
  database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
    if (err)
      res
        .status(400)
        .send(
          `Successfully added Department, but unable get record Id. Request Error: ${err}`
        );
    else res.status(201).json({ message: `Department Id: ${result[0].id}` });
  });
};

// Get Departments Method

export const getDepartments = async (req, res) => {
  // Query
  database.query("SELECT id, name FROM hm_department", (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else res.status(200).json(result);
  });
};

// Get Department By Id Method

export const getDepartmentById = async (req, res) => {
  // Query
  database.query(
    "SELECT id, name FROM hm_department WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(200).json(result);
    }
  );
};

// Delete Department By Id Method

export const deleteDepartment = async (req, res) => {
  let id = req.params.id;
  database.query(
    "DELETE FROM hm_department WHERE id = ?;",
    [id],
    (err, result) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else
        res
          .status(200)
          .json({ message: `Department Id:${id} deleted successfully.` });
    }
  );
};

// Update Department

export const updateDepartment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { Id, Name } = req.body;
  database.query(
    "UPDATE hm_department SET name = ? WHERE id = ?",
    [Name, Id],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(204).json({ message: "Department Details Updated" });
    }
  );
};
