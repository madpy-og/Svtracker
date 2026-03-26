import express from "express";
import {
  getAllIncome,
  addIncome,
  deleteIncome,
} from "../controllers/incomeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", verifyToken, getAllIncome);
router.post("/add", verifyToken, addIncome);
router.delete("/delete/:id", verifyToken, deleteIncome);

export default router;
