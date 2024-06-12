import express from "express";

import {
  loginUser,
  registerUser,
} from "../controllers/authentication.controller.js";

import { deleteUser } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/adminAuth.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Delete User only administrator access
router.delete("/user", isAdmin, deleteUser);

export default router;
