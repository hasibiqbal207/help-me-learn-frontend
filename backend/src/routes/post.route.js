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

router.get("/posts", searchPost);
router.get("/posts/:id", getPost);
router.post("/posts", createPostValidation, createPost);
router.put("/posts", updatePostValidation, updatePost);
router.delete("/posts/:id", deletePost);

export default router;
