import express from "express";
const router = express.Router();

// Login & Register
let loginController = require("../controller/loginController");

router.post("/register", loginController.registerUser);
router.post("/login", loginController.loginUser);

// Delete User
let adminController = require("../controller/adminController");
router.delete("/user", adminAuth.isAdmin, adminController.deleteUser);

export default router;