import express from "express";
const router = express.Router();

// Department
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import validation from "../utils/validation.js";

// Validation
const { createDeptValidation, updateDeptValidation } = validation;

router.post("/", createDeptValidation, createDepartment);

router.put("/", updateDeptValidation, updateDepartment);

router.delete("/:id", deleteDepartment);

router.get("/", getDepartments);

router.get("/:id", getDepartmentById);

export default router;
