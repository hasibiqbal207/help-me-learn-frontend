import express from "express";
const router = express.Router();

import {getReviews, getReviewById, createReview, updateReview, deleteReview} from "../controllers/review.controller.js"
// Validation
import validation from "../utils/validation.js";

const {
  createReviewValidation,
  updateReviewValidation,
} = validation;

// Review

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", createReviewValidation, createReview);
router.put("/", updateReviewValidation, updateReview);
router.delete("/:id", deleteReview);

export default router;
