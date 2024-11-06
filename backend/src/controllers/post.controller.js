import { validationResult } from "express-validator";
import * as postService from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tutorProfile = await postService.getTutorProfileByUserId(req.body.userId);
    const tutorProfileId = tutorProfile[0].id;


    const postData = {
      ...req.body,
      tutorProfileId,
      date: new Date().toISOString().split("T")[0],
      isActive: true
    };

    const result = await postService.createNewPost(postData);
    // await postService.updateTutorStatus(tutorProfileId);

    res.status(201).json({ message: `Post Id: ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  try {
    await postService.deletePostById(req.params.id);
    res.status(200).json({ 
      message: `Post Id:${req.params.id} deleted successfully.` 
    });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = {
      ...req.body,
      date: new Date().toISOString().split("T")[0]
    };

    await postService.updatePostById(postData);
    res.status(204).json({ message: "Post Details Updated" });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const getPost = async (req, res) => {
  try {
    const result = await postService.getPostById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const searchPost = async (req, res) => {
  try {
    const result = await postService.searchPosts(req.query);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
