import express from "express";
const router = express.Router();

let qualificationController = require("../controller/qualificationController");

router.get("/:tutorProfileId", qualificationController.getQualificationByTutorProfileId);
router.get("/:id", qualificationController.getQualificationById);
router.post("/", createQualificationValidation, qualificationController.createQualification);
router.put("/", updateQualificationValidation, qualificationController.updateQualification);
router.delete("/:id", qualificationController.deleteQualification);

export default router;