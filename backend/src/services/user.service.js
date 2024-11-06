import database from "../../config/database.config.js";
import util from "util";

const executeQuery = util.promisify(database.query).bind(database);

export const createNewUser = async (userData) => {
  const { firstName, lastName, userType, email, password, status, gender } = userData;
  
  return executeQuery(
    "INSERT INTO hm_user (firstName, lastName, usertype, email, password, status, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, userType, email, password, status, gender]
  );
};

export const getLastInsertId = async () => {
  const result = await executeQuery("SELECT LAST_INSERT_ID() as id");
  return result[0].id;
};

export const getUsersByFilters = async (filters) => {
  const conditions = [];
  const values = [];

  if (filters.userType !== undefined) {
    conditions.push("usertype = ?");
    values.push(filters.userType);
  }

  if (filters.status !== undefined) {
    conditions.push("status = ?");
    values.push(filters.status);
  }

  if (filters.lastName !== undefined) {
    conditions.push("lastName = ?");
    values.push(filters.lastName);
  }

  if (filters.firstName !== undefined) {
    conditions.push("firstName = ?");
    values.push(filters.firstName);
  }

  if (filters.email !== undefined) {
    conditions.push("email = ?");
    values.push(filters.email);
  }

  let query = "SELECT id, firstName, lastName, usertype as userType, email, status, gender FROM hm_user";
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  return executeQuery(query, values);
};

export const getUserById = async (id) => {
  return executeQuery(
    "SELECT firstName, lastName, usertype, email, status, gender FROM hm_user WHERE id = ?",
    [id]
  );
};

export const updateUser = async (userData) => {
  const { id, firstName, lastName, userType, email, status, gender } = userData;
  
  return executeQuery(
    "UPDATE hm_user SET firstName = ?, lastName = ?, usertype = ?, email = ?, status = ?, gender = ? WHERE id = ?",
    [firstName, lastName, userType, email, status, gender, id]
  );
};

export const deleteUserById = async (id) => {
  return executeQuery(
    "DELETE FROM hm_user WHERE id = ?",
    [id]
  );
}; 