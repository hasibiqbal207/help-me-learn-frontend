import express from "express";
const router = express.Router();

// Import Routes
import authenticationRoute from "./authentication.route.js";
import courseRoute from "./course.route.js";
import departmentRoute from "./department.route.js";
import feedbackRoute from "./feedback.route.js";
import postRoute from "./post.route.js";
import qualificationRoute from "./qualifications.route.js";
import reviewRoute from "./review.route.js";
import tutorprofileRoute from "./tutorprofile.route.js";
import userRoute from "./user.route.js";

import unitfeatureRoute from "./unitfeature.route.js";

// Use Routes
router.use("/auth", authenticationRoute);
router.use("/courses", courseRoute);
router.use("/depts", departmentRoute);
router.use("/feedbacks", feedbackRoute);
router.use("/posts", postRoute);
router.use("/qualifications", qualificationRoute);
router.use("/reviews", reviewRoute);
router.use("/tutors", tutorprofileRoute);
router.use("/users", userRoute);

// Not Resolved Routes
router.use("/unitfeatures", unitfeatureRoute);

export default router;