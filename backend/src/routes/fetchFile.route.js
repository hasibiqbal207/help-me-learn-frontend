import express from "express";
const router = express.Router();

let fetchController = require("../controller/fetchFileController");

import tutorAuth from "../middlewares/tutorAuth";

router.get("/fetch/file/:id", fetchController.file);
router.get("/fetch/image", tutorAuth.isTutor, fetchController.image);
export default router;
