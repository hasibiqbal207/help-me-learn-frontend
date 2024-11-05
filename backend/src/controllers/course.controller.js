import { validationResult } from "express-validator";
import * as courseService from "../services/course.service.js";

export const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseData = {
      ...req.body,
      status: 100
    };

    await courseService.insertCourse(courseData);
    const newCourseId = await courseService.getLastInsertId();
    
    res.status(201).json({ message: `Course Id: ${newCourseId}` });
  } catch (error) {
    res.status(400).send(`Request Error: ${error}`);
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses(req.query.Status);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).send(`Request Error: ${error}`);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const result = await courseService.getCourseById(courseId);
    
    if (result.length === 0) {
      return res.status(404).send("Course not found");
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    await courseService.deleteCourseById(courseId);
    res.status(200).json({ message: `Course Id:${courseId} deleted successfully.` });
  } catch (error) {
    res.status(400).send(`Request Error: ${error}`);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await courseService.updateCourseById(req.body);
    
    if (result.affectedRows === 0) {
      return res.status(404).send("Course not found");
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(400).send(`Request Error: ${error}`);
  }
};
