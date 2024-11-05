import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authService from "../services/authentication.service.js";

dotenv.config();

/**
   * UserType  Enums:
      100 - Admin
      101 - Tutor
      102 - Student
   */
  //Registering User


  /**
   * Status Enums:
      100 - Pending
      101 - Approved
      102 - Rejected-
   */
  //Login check
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = await authService.findUserByEmail(email);
    
    if (users.length === 0) {
      return res.json({ message: "User Do Not Exists" });
    }
    
    const user = users[0];
    if (user.status == 100 || user.status == 102) {
      const errorMessage = user.status == 100 ? "Pending" : "Rejected";
      return res.json({ message: `User registration is: ${errorMessage}` });
    }

    const isPasswordValid = await authService.comparePasswords(password, user.password);
    
    if (isPasswordValid) {
      const payload = {
        id: user.id,
        email: user.email,
        user_type: user.usertype,
        status: user.status,
      };

      const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });

      return res.json({ id: user.id, email: user.email, token: token });
    } else {
      return res.json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, usertype, email, password, status, gender } = req.body;

    const existingUsers = await authService.findUserByEmail(email);
    
    if (existingUsers.length > 0) {
      return res.json({ message: "User Already Exists!" });
    }

    const encrypted_password = await authService.hashPassword(password);
    
    const result = await authService.createUser({
      first_name,
      last_name,
      usertype,
      email,
      encrypted_password,
      status,
      gender
    });

    if (usertype == 101) {
      await authService.createTutorProfile(result.insertId);
    }

    return res.json({ message: "User Created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};