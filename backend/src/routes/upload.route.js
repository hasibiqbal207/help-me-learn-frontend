import express from "express";
const router = express.Router();

import { tutorAuth } from "../middlewares/tutorAuth";

let uploadController = require("../controller/uploadController");
router.post("/upload", tutorAuth.isTutor, uploadController.upload);
export default router;
