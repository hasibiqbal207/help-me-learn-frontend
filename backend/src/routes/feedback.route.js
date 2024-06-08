import express from "express";
const router = express.Router();

// Feedback
let feedbackController = require("../controller/userFeedbackController");
router.get("/", feedbackController.getFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", feedbackController.createUserFeedback);

export default router;
