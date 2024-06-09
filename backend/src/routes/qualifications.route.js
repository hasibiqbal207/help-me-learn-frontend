import express from "express";
const router = express.Router();

// Validation
import {
  createQualificationValidation,
  updateQualificationValidation,
} from "../utils/validation.js";

let qualificationController = require("../controller/qualificationController");

router.get(
  "/:tutorProfileId",
  qualificationController.getQualificationByTutorProfileId
);
router.get("/:id", qualificationController.getQualificationById);
router.post(
  "/",
  createQualificationValidation,
  qualificationController.createQualification
);
router.put(
  "/",
  updateQualificationValidation,
  qualificationController.updateQualification
);
router.delete("/:id", qualificationController.deleteQualification);

export default router;
