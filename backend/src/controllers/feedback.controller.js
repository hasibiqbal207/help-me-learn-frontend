import { validationResult } from "express-validator";
import * as feedbackService from "../services/feedback.service.js";

export const createUserFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const feedbackData = {
      subject: req.body.subject,
      description: req.body.description,
      userId: req.body.userId,
      date: new Date()
    };

    await feedbackService.createFeedback(feedbackData);
    const newFeedbackId = await feedbackService.getLastInsertId();
    
    res.status(201).json({ message: `Feedback Id: ${newFeedbackId}` });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await feedbackService.getFeedbackById(req.params.id);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).send(`Request Error: ${error}`);
  }
};
