import express from "express";
const router = express.Router();

import validation from "../utils/validation.js";
const { createPollValidation } = validation;
import { viewPolls, createPoll } from "../controllers/tutorPoll.controller.js"

router.post("/polls", createPollValidation, createPoll);
router.get("/polls", viewPolls);

export default router;
