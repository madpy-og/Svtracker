import express from "express";
import {
  getAllIncome,
  addIncome,
  deleteIncome,
} from "../controllers/incomeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllIncome);
router.post("/", verifyToken, addIncome);
router.delete("/:id", verifyToken, deleteIncome);

export default router;
