import express from "express";
const router = express.Router();

// Review
let reviewController = require("../controller/reviewController");

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", createReviewValidation, reviewController.createReview);
router.put("/", updateReviewValidation, reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

export default router;