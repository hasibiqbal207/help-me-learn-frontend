import express from "express";
const router = express.Router();

import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
// Validation
import validation from "../utils/validation.js";

const { createReviewValidation, updateReviewValidation } = validation;

// Review

router.post("/", createReviewValidation, createReview);

router.put("/", updateReviewValidation, updateReview);

router.delete("/:id", deleteReview);

router.get("/", getReviews);

router.get("/:tutorProfileId", getReviewById);

export default router;
