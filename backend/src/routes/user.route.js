import express from "express";
const router = express.Router();

// User
import {getUsers, getUserById, createUser, updateUser, deleteUser} from "../controllers/user.controller.js"

// Validation
import validation from "../utils/validation.js";

const {createUserValidation, updateUserValidation} = validation;

// router.post("/", createUserValidation, createUser);

router.put("/", updateUserValidation, updateUser);

router.delete("/:id", deleteUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

export default router;
