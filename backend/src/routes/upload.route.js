import express from "express";
const router = express.Router();

import { isTutor } from "../middlewares/tutorAuth.js";
import { upload } from "../controllers/upload.controller.js";

router.post("/upload", isTutor, upload);

export default router;
