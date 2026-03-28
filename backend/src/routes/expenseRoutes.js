import express from "express";
import {
  getAllExpense,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllExpense);
router.post("/", verifyToken, addExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;
