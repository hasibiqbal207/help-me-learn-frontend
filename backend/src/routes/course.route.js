import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import validation from "../utils/validation.js";

// Validation
const { createCourseValidation, updateCourseValidation } = validation;

// Course
const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post("/", createCourseValidation, createCourse);

router.put("/", updateCourseValidation, updateCourse);

router.delete("/:id", deleteCourse);

export default router;
