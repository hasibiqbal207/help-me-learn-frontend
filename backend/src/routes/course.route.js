import express from "express";
const router = express.Router();

// Validation
import {
  createCourseValidation,
  updateCourseValidation,
} from "../utils/validation.js";

// Course
let courseController = require("../controller/courseController");

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);

router.post("/", createCourseValidation, courseController.createCourse);

router.put("/", updateCourseValidation, courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

export default router;
