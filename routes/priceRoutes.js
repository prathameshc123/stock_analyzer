import express from "express";
import { addPrice, getPrices } from "../controllers/priceController.js";

const router = express.Router();

// Add a new stock price
router.post("/", addPrice);

// Get all prices for a specific company
router.get("/:companyId", getPrices);

export default router;
