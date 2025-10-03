import express from "express";
import { getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

// Get all transactions for a specific user
router.get("/:userId", getTransactions);

export default router;
