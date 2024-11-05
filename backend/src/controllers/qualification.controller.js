import { validationResult } from "express-validator";
import * as qualificationService from "../services/qualification.service.js";

export const createQualification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tutorProfile = await qualificationService.getTutorProfileByUserId(req.body.userId);
    const tutorProfileId = tutorProfile[0].id;

    const qualificationData = {
      ...req.body,
      tutorProfileId
    };

    const result = await qualificationService.createQualification(qualificationData);
    await qualificationService.updateTutorStatus(tutorProfileId);

    res.json({ message: `Qualification Id: ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getQualificationById = async (req, res) => {
  try {
    const result = await qualificationService.getQualificationById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(`Request Error: ${error}`);
  }
};

export const getQualificationByTutorProfileId = async (req, res) => {
  try {
    const result = await qualificationService.getQualificationsByTutorProfileId(req.params.tutorProfileId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQualification = async (req, res) => {
  try {
    await qualificationService.deleteQualificationById(req.params.id);
    res.json({ 
      message: `Qualification Id:${req.params.id} deleted successfully.` 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateQualification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await qualificationService.updateQualificationById(req.body);
    res.json({ message: "Qualification Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
