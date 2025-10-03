import express from "express";
import {
  buyStock,
  sellStock,
  getHoldings,
  getTransactions,
  getPortfolioReport,
  getPortfolioGain,
} from "../controllers/portfolioControllers.js";

const router = express.Router();

// Portfolio gain (specific first to avoid conflict)
router.get("/gain/:userId", getPortfolioGain);

// Holdings and transactions
router.get("/:userId/holdings", getHoldings);
router.get("/:userId/transactions", getTransactions);

// Portfolio report
router.get("/:userId", getPortfolioReport);

// Buy and sell
router.post("/buy", buyStock);
router.post("/sell", sellStock);

export default router;
