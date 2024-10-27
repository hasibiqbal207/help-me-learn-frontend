import express from "express";
const router = express.Router();

import {
  searchPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

// Validation
import validation from "../utils/validation.js";
const { createPostValidation, updatePostValidation } = validation;

router.post("/", createPostValidation, createPost);
router.put("/", updatePostValidation, updatePost);
router.delete("/:id", deletePost);
router.get("/", searchPost);
router.get("/:id", getPost);

export default router;
