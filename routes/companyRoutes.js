import express from "express";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyControllers.js";

const router = express.Router();

// Get all companies
router.get("/", getCompanies);

// Create a new company
router.post("/", createCompany);

// Update a company by ID
router.put("/:id", updateCompany);

// Delete a company by ID
router.delete("/:id", deleteCompany);

export default router;
