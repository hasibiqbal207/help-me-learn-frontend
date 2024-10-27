import express from "express";
const router = express.Router();

import {
  getTutorAbouInfoById,
  getTutorOfferedCoursesById,
  getTutorQualificationById,
  searchTutorProfile,
  getTutorsByStatus,
  getReviewsById,
  saveTutorInfo,
  updateTutorInfo,
} from "../controllers/tutorProfile.controller.js";

import validation from "../utils/validation.js";
const { createTutorProfileValidation, updateTutorProfileValidation } =
  validation;

// Tutor Profile

router.post("/", createTutorProfileValidation, saveTutorInfo);
router.put("/", updateTutorProfileValidation, updateTutorInfo);

router.get("/:id", getTutorAbouInfoById);

router.get("/course/:id", getTutorOfferedCoursesById);
router.get("/qualification/:id", getTutorQualificationById);
router.get("/reviews/:id", getReviewsById);

router.get("/", searchTutorProfile);
router.get("/status", getTutorsByStatus);

export default router;
