import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userType: req.body.userType,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      gender: req.body.gender
    };

    await userService.createNewUser(userData);
    const newUserId = await userService.getLastInsertId();
    
    res.status(201).json({ message: `User Id: ${newUserId}` });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating user", 
      error: error.message 
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const filters = {
      userType: req.query.userType,
      status: req.query.status,
      lastName: req.query.lastName,
      firstName: req.query.firstName,
      email: req.query.email
    };

    const users = await userService.getUsersByFilters(filters);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ 
      message: "Error retrieving users", 
      error: error.message 
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(400).json({ 
      message: "Error retrieving user", 
      error: error.message 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await userService.updateUser(req.body);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User Details Updated" });
  } catch (error) {
    res.status(400).json({ 
      message: "Error updating user", 
      error: error.message 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.params.id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ 
      message: "Error deleting user", 
      error: error.message 
    });
  }
};
