import express from "express";
const router = express.Router();

import validation from "../utils/validation.js";
const { createPollValidation } = validation;
import { viewPolls, createPoll } from "../controllers/tutorPoll.controller.js"

router.post("/", createPollValidation, createPoll);
router.get("/", viewPolls);

export default router;
