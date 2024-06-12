import express from "express";
const router = express.Router();

import { isTutor } from "../middlewares/tutorAuth.js";
import { file, image } from "../controllers/fetchFile.controller.js";

router.get("/fetch/file/:id", file);
router.get("/fetch/image", image);
router.get("/fetch/image", isTutor, image);

export default router;
