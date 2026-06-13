import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import User from "../models/User.js";
import { Types } from "mongoose";

// ── GET /api/dashboard ─────────────────────────────────────────
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregateTotalByUser(userObjectId);
    const totalExpense = await Expense.aggregateTotalByUser(userObjectId);

    const last60DaysIncomeTransactions = await Income.findByUserSince(
      userId,
      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    );

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const last30DaysExpenseTransactions = await Expense.findByUserSince(
      userId,
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    );

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const recentIncomes = await Income.findRecentByUser(userId, 5);
    const recentExpenses = await Expense.findRecentByUser(userId, 5);

    const lastTransactions = [
      ...recentIncomes.map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...recentExpenses.map((txn) => ({ ...txn.toObject(), type: "expense" })),
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

    const user = await User.findByIdSafe(userObjectId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();

    const rawIncomeByMonth = await Income.aggregateMonthlyByUser(userObjectId);
    const rawExpenseByMonth = await Expense.aggregateMonthlyByUser(userObjectId);

    // Determine the earliest year and month from the raw data
    let startYear = now.getFullYear();
    let startMonth = now.getMonth() + 1;

    const allRecords = [...rawIncomeByMonth, ...rawExpenseByMonth];
    if (allRecords.length > 0) {
      allRecords.sort((a, b) => {
        if (a._id.year === b._id.year) {
          return a._id.month - b._id.month;
        }
        return a._id.year - b._id.year;
      });
      startYear = allRecords[0]._id.year;
      startMonth = allRecords[0]._id.month;
    }

    const fillGaps = (data) => {
      const result = [];
      let currYear = startYear;
      let currMonth = startMonth;

      for (let i = 0; i < 12; i++) {
        const found = data.find((d) => d._id.year === currYear && d._id.month === currMonth);
        result.push(found || { _id: { year: currYear, month: currMonth }, total: 0 });

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
    const userObjectId = new Types.ObjectId(String(req.user._id));

    const result = await Expense.aggregateByCategory(userObjectId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/dashboard/income-by-source ───────────────────────
export const getIncomeBySource = async (req, res) => {
  try {
    const userObjectId = new Types.ObjectId(String(req.user._id));

    const result = await Income.aggregateBySource(userObjectId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
