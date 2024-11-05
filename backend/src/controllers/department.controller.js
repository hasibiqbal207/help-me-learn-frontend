import { validationResult } from "express-validator";
import * as departmentService from "../services/department.service.js";

export const createDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    await departmentService.insertDepartment(name);
    const newDepartmentId = await departmentService.getLastInsertId();
    
    res.status(201).json({ message: `Department Id: ${newDepartmentId}` });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    await departmentService.deleteDepartmentById(id);
    res.status(200).json({ message: `Department Id:${id} deleted successfully.` });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name } = req.body;
    await departmentService.updateDepartmentById(id, name);
    res.status(204).json({ message: "Department Details Updated" });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};
