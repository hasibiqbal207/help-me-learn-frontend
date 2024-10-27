import express from "express";
const router = express.Router();

import {
  getQualificationByTutorProfileId,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../controllers/qualification.controller.js";

import validation from "../utils/validation.js";

// Validation
const { createQualificationValidation, updateQualificationValidation } =
  validation;

router.get("/:tutorProfileId", getQualificationByTutorProfileId);
router.get("/:id", getQualificationById);
router.post("/", createQualificationValidation, createQualification);
router.put("/", updateQualificationValidation, updateQualification);
router.delete("/:id", deleteQualification);

export default router;
