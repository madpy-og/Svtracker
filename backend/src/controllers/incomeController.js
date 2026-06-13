import Income from "../models/Income.js";
import { Types } from "mongoose";

export const getAllIncome = async (req, res) => {
  try {
    const income = await Income.findByUser(req.user._id);

    res.status(200).json({ income, message: "Fetching income successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    await Income.createIncome({ userId: req.user._id, source, amount, date });

    res.status(201).json({ message: "Create new income successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.deleteById(req.params.id);

    res.status(200).json({ message: "Income deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ── GET /api/income/daily?days=30 ─────────────────────────────
export const getDailyIncome = async (req, res) => {
  try {
    const userObjectId = new Types.ObjectId(String(req.user._id));
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await Income.aggregateDailyByUser(userObjectId, startDate);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
