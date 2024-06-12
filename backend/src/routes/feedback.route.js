import express from "express";
const router = express.Router();

import {getFeedbacks, getFeedbackById, createUserFeedback} from "../controllers/feedback.controller.js"

// Feedback
router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);
router.post("/", createUserFeedback);

export default router;
