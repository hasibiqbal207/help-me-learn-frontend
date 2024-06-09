import express from "express";
const router = express.Router();

// Import Routes
import authenticationRoute from "./authentication.route.js";
import courseRoute from "./course.route.js";
import dashboardRoute from "./dashboard.route.js";
import departmentRoute from "./department.route.js";
import feedbackRoute from "./feedback.route.js";
import fetchFileRoute from "./fetchFile.route.js";
import postRoute from "./post.route.js";
import qualificationRoute from "./qualifications.route.js";
import reviewRoute from "./review.route.js";
import tutorPollRoute from "./tutorPoll.route.js";
import tutorprofileRoute from "./tutorprofile.route.js";
import uploadRoute from "./upload.route.js";
import userRoute from "./user.route.js";

// Use Routes
router.use("/auth", authenticationRoute);
router.use("/courses", courseRoute);
router.use("/dashboard", dashboardRoute);
router.use("/depts", departmentRoute);
router.use("/feedbacks", feedbackRoute);
router.use("/files", fetchFileRoute);
router.use("/posts", postRoute);
router.use("/qualifications", qualificationRoute);
router.use("/reviews", reviewRoute);
router.use("/tutorpolls", tutorPollRoute);
router.use("/tutors", tutorprofileRoute);
router.use("/uploads", uploadRoute);
router.use("/users", userRoute);

export default router;
