import express from "express";
const router = express.Router();

import { createPollValidation } from "../utils/validation";

let tutorPollController = require("../controller/TutorPollController");

router.post("/polls", createPollValidation, tutorPollController.createPoll);
router.get("/polls", tutorPollController.viewPolls);
export default router;
