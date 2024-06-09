import express from "express";
const router = express.Router();

let dashboardController = require("../controller/dashboardController");
router.get("/dashboard", dashboardController.dashboard);

export default router;
