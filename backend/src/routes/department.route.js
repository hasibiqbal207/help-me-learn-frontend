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

router.get("/", getDepartments);
router.get("/:id", getDepartmentById);

router.post("/", createDeptValidation, createDepartment);

router.put("/", updateDeptValidation, updateDepartment);

router.delete("/:id", deleteDepartment);

export default router;
