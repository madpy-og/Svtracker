import express from "express";
import {
  getAllExpense,
  addExpense,
  deleteExpense,
  getDailyExpense,
} from "../controllers/expenseController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllExpense);
router.get("/daily", verifyToken, getDailyExpense);
router.post("/", verifyToken, addExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;
