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

router.post("/", createCourseValidation, createCourse);

router.get("/:id", getCourseById);

router.put("/", updateCourseValidation, updateCourse);

router.get("/", getCourses);

router.delete("/:id", deleteCourse);

export default router;
