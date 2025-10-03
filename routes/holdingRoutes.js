import express from "express";
import { getHoldings } from "../controllers/portfolioControllers.js";

const router = express.Router();

// Get holdings for a specific user
router.get("/:userId", getHoldings);

export default router;
