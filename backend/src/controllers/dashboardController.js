import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import User from "../models/User.js";
import { Types } from "mongoose";

// ── GET /api/dashboard ─────────────────────────────────────────
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .populate("source");

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .populate("category");

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const lastTransactions = [
      ...(
        await Income.find({ userId })
          .sort({ date: -1 })
          .populate("source")
          .limit(5)
      ).map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...(
        await Expense.find({ userId })
          .sort({ date: -1 })
          .populate("category")
          .limit(5)
      ).map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncomes: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/dashboard/monthly-summary ────────────────────────
export const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const user = await User.findById(userObjectId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const startDate = user.createdAt || new Date();
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1; // 1-12

    const now = new Date();
    const endYear = now.getFullYear();
    const endMonth = now.getMonth() + 1;

    const rawIncomeByMonth = await Income.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const rawExpenseByMonth = await Expense.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const fillGaps = (data) => {
      const result = [];
      let currYear = startYear;
      let currMonth = startMonth;

      while (currYear < endYear || (currYear === endYear && currMonth <= endMonth)) {
        const found = data.find(
          (d) => d._id.year === currYear && d._id.month === currMonth
        );
        result.push(
          found || { _id: { year: currYear, month: currMonth }, total: 0 }
        );

        currMonth++;
        if (currMonth > 12) {
          currMonth = 1;
          currYear++;
        }
      }
      return result;
    };

    const incomeByMonth = fillGaps(rawIncomeByMonth);
    const expenseByMonth = fillGaps(rawExpenseByMonth);

    res.json({ incomeByMonth, expenseByMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/dashboard/expense-by-category ────────────────────
export const getExpenseByCategory = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const result = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          name: "$categoryInfo.name",
          icon: "$categoryInfo.icon",
          total: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/dashboard/income-by-source ───────────────────────
export const getIncomeBySource = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const result = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$source",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "sources",
          localField: "_id",
          foreignField: "_id",
          as: "sourceInfo",
        },
      },
      { $unwind: "$sourceInfo" },
      {
        $project: {
          name: "$sourceInfo.name",
          icon: "$sourceInfo.icon",
          total: 1,
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
