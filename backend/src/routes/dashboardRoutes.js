import express from "express";
import {
  getDashboardData,
  getMonthlySummary,
  getExpenseByCategory,
  getIncomeBySource,
} from "../controllers/dashboardController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getDashboardData);
router.get("/monthly-summary", verifyToken, getMonthlySummary);
router.get("/expense-by-category", verifyToken, getExpenseByCategory);
router.get("/income-by-source", verifyToken, getIncomeBySource);

export default router;
