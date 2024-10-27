import express from "express";
const router = express.Router();
import {dashboard} from "../controllers/dashboard.controller.js"

router.get("/", dashboard);

export default router;
