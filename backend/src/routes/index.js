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
import tutorProfileRoute from "./tutorProfile.route.js";
import uploadRoute from "./upload.route.js";
import userRoute from "./user.route.js";

// Use Routes
router.use("/auth", authenticationRoute);
router.use("/courses", courseRoute);
router.use("/dashboard", dashboardRoute);
router.use("/department", departmentRoute);
router.use("/feedback", feedbackRoute);
router.use("/files", fetchFileRoute);
router.use("/post", postRoute);
router.use("/qualification", qualificationRoute);
router.use("/review", reviewRoute);
router.use("/tutorPoll", tutorPollRoute);
router.use("/tutor", tutorProfileRoute);
router.use("/upload", uploadRoute);
router.use("/user", userRoute);

export default router;
