import Expense from "../models/Expense.js";
import { Types } from "mongoose";

export const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.findByUser(req.user._id);

    res.status(200).json({ expense, message: "Fetching expense successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { category, amount, date } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    await Expense.createExpense({ userId: req.user._id, category, amount, date });

    res.status(201).json({ message: "Create new expense successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.deleteById(req.params.id);

    res.status(200).json({ message: "Expense deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ── GET /api/expense/daily?days=30 ────────────────────────────
export const getDailyExpense = async (req, res) => {
  try {
    const userObjectId = new Types.ObjectId(String(req.user._id));
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await Expense.aggregateDailyByUser(userObjectId, startDate);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
