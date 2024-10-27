import express from "express";
const router = express.Router();

import {getFeedbacks, getFeedbackById, createUserFeedback} from "../controllers/feedback.controller.js"

// Feedback
router.post("/", createUserFeedback);
router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);

export default router;
