import express from "express";
const router = express.Router();

// Tutor Profile
let tutorProfileController = require("../controller/TutorProfileController");

router.get("/Info/:id", tutorProfileController.getTutorAbouInfoById);
router.get("/courses/:id", tutorProfileController.getTutorOfferedCoursesById);
router.get("/qualification/:id", tutorProfileController.getTutorQualificationById);
router.get("/reviews/:id", tutorProfileController.getReviewsById);
router.get("/", tutorProfileController.searchTutorProfile);
router.get("/status", tutorProfileController.getTutorsByStatus);
router.post("/", createTutorProfileValidation, tutorProfileController.saveTutorInfo);
router.put("/", updateTutorProfileValidation, tutorProfileController.updateTutorInfo);

export default router;