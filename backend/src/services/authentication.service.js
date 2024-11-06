import database from "../../config/database.config.js";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    database.execute(
      "SELECT * FROM `helpmelearn`.`hm_user` WHERE `email`= ?",
      [email],
      function (err, result) {
        if (err) reject(new Error(err.message));
        resolve(result);
      }
    );
  });
};

export const createUser = async (userData) => {
  const { firstName, lastName, userType, email, encryptedPassword, status, gender } = userData;
  
  return new Promise((resolve, reject) => {
    database.execute(
      "INSERT INTO `helpmelearn`.`hm_user` (`firstName`, `lastName`, `usertype`, `email`, `password`, `status`, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, userType, email, encryptedPassword, status, gender],
      (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      }
    );
  });
};

export const createTutorProfile = async (userId) => {
  return new Promise((resolve, reject) => {
    database.execute(
      "INSERT INTO `helpmelearn`.`hm_tutor_profile` (`userId`, `rating`) VALUES (?, 0)",
      [userId],
      (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      }
    );
  });
};

export const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, encrypted_password) => {
      if (err) reject(new Error(err.message));
      resolve(encrypted_password);
    });
  });
};

export const comparePasswords = async (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) reject(new Error(err.message));
      resolve(result);
    });
  });
}; 