import { validationResult } from "express-validator";
import * as reviewService from "../services/review.service.js";

export const createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, rating, userId, tutorProfileId } = req.body;
    
    // Verify tutor profile exists
    const tutorProfile = await reviewService.getTutorProfileById(tutorProfileId);
    if (tutorProfile.length === 0) {
      return res.status(400).json({ 
        message: `No tutor found with ID: ${tutorProfileId}` 
      });
    }

    const reviewData = {
      text,
      rating,
      userId,
      tutorProfileId: tutorProfile[0].id,
      date: new Date()
    };

    await reviewService.createReview(reviewData);
    const result = await reviewService.getLastInsertId();
    
    res.status(201).json({ message: `Review Id: ${result[0].id}` });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getReviewById = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByTutorId(req.params.tutorProfileId);
    res.json(reviews);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByFilters(req.query);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReviewById(req.params.id);
    res.status(200).json({ 
      message: `Review Id:${req.params.id} deleted successfully.` 
    });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const updateReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reviewData = {
      ...req.body,
      date: new Date().toISOString().split("T")[0]
    };

    await reviewService.updateReview(reviewData);
    res.status(204).json({ message: "Review Details Updated" });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};
