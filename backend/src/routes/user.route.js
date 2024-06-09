import express from "express";
const router = express.Router();

// User
let userController = require("../controller/userController");

// Validation
let createUserValidation = require("../validation/createUserValidation");
let updateUserValidation = require("../validation/updateUserValidation");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

router.post("/", createUserValidation, userController.createUser);

router.put("/", updateUserValidation, userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
