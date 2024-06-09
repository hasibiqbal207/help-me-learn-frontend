import express from "express";
const router = express.Router();

// Validation
import {
  createPostValidation,
  updatePostValidation,
} from "../utils/validation.js";

let postController = require("../controller/postController");

router.get("/posts", postController.searchPost);
router.get("/posts/:id", postController.getPost);
router.post("/posts", createPostValidation, postController.createPost);
router.put("/posts", updatePostValidation, postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

export default router;
