import database from "../../config/database.js";

import { validationResult } from "express-validator";

export const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { FirstName, LastName, UserType, Email, Password, Status, Gender } =
    req.body;

  database.query(
    "INSERT INTO hm_user (firstName, lastName, usertype, email, password, status, gender) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    [FirstName, LastName, UserType, Email, Password, Status, Gender],
    (err, result) => {
      if (err) console.log(err);
    }
  );

  database.query("SELECT LAST_INSERT_ID() as id;", (err, result) => {
    res.json({ message: `User Id: ${result[0].id}` });
  });
};

export const getUsers = async (req, res) => {
  let joinQuery = "";
  if (req.query.UserType !== undefined)
    joinQuery += `usertype = ${database.escape(req.query.UserType)}`;

  if (req.query.Status !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `Status = ${database.escape(req.query.Status)}`;
  }

  if (req.query.LastName !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `lastName = ${database.escape(req.query.LastName)}`;
  }

  if (req.query.FirstName !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `firstName = ${database.escape(req.query.FirstName)}`;
  }

  if (req.query.Email !== undefined) {
    if (joinQuery != "") joinQuery += " and ";

    joinQuery += `email = ${database.escape(req.query.Email)}`;
  }

  let query =
    "SELECT id, firstName, lastName, usertype, email, status, gender FROM hm_user";
  if (joinQuery !== "") query += ` where ${joinQuery}`;
  database.query(query, (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else res.status(200).json(result);
  });
};

export const getUserById = async (req, res) => {
  let query =
    "SELECT firstName, lastName, usertype, email, status, gender FROM hm_user WHERE id = ?";

  database.query(query, [req.params.id], (err, result) => {
    if (err) res.status(400).send(`Response Error: ${err}`);
    else res.status(200).json(result);
  });
};

export const updateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { Id, FirstName, LastName, UserType, Email, Status, Gender } = req.body;

  database.query(
    "UPDATE hm_user SET firstName = ?, lastName = ?, usertype = ?, email = ?, status = ?, gender = ? WHERE id= ?",
    [FirstName, LastName, UserType, Email, Status, Gender, Id],
    (err) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(204).json({ message: "User Details Updated" });
    }
  );
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  database.query(
    "DELETE FROM hm_user WHERE id = ?",
    [id],
    (err, result, fields) => {
      if (err) res.status(400).send(`Response Error: ${err}`);
      else res.status(200).json({ message: "User deleted successfully." });
    }
  );
};
