import { validationResult } from "express-validator";
import * as tutorPollService from "../services/tutorPoll.service.js";

export const createPoll = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pollData = {
      ...req.body,
      tutorProfileId: req.body.id
    };

    await tutorPollService.createNewPoll(pollData);
    res.status(200).json({ message: "Poll created successfully." });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const deletePoll = async (req, res) => {
  try {
    const id = req.params.id;
    await tutorPollService.deletePollById(id);
    res.status(200).json({ 
      message: `Poll Id:${id} deleted successfully.` 
    });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};

export const viewPolls = async (req, res) => {
  try {
    const tutorProfileId = req.params.id;
    const result = await tutorPollService.getPollsByTutorId(tutorProfileId);
    res.status(200).json(result);
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

    const pollData = {
      ...req.body,
      date: new Date().toISOString().split("T")[0]
    };

    await tutorPollService.updatePollById(pollData);
    res.status(204).json({ message: "Post Details Updated" });
  } catch (error) {
    res.status(400).send(`Response Error: ${error}`);
  }
};
