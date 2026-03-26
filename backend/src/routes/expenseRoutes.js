import express from "express";
import {
  getAllExpense,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", verifyToken, getAllExpense);
router.post("/add", verifyToken, addExpense);
router.delete("/delete/:id", verifyToken, deleteExpense);

export default router;
