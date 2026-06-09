import { z } from "zod";
import { sourceSchema } from "./sourceSchema";
import { categorySchema } from "./categorySchema";

const transactionSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  source: sourceSchema.optional(),
  category: categorySchema.optional(),
  amount: z.number(),
  date: z.string(),
  type: z.enum(["income", "expense"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const dashboardSchema = z.object({
  totalBalance: z.number(),
  totalIncomes: z.number(),
  totalExpenses: z.number(),
  last30DaysExpenses: z.object({
    total: z.number(),
    transactions: z.array(z.object({})),
  }),
  last60DaysIncome: z.object({
    total: z.number(),
    transactions: z.array(transactionSchema),
  }),
  recentTransactions: z.array(transactionSchema),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;

// ── Baru: untuk GET /api/dashboard/monthly-summary ─────────────
export const monthlyDataSchema = z.object({
  _id: z.object({
    year: z.number(),
    month: z.number(),
  }),
  total: z.number(),
});

export const monthlySummarySchema = z.object({
  incomeByMonth: z.array(monthlyDataSchema),
  expenseByMonth: z.array(monthlyDataSchema),
});

export type MonthlyData = z.infer<typeof monthlyDataSchema>;
export type MonthlySummary = z.infer<typeof monthlySummarySchema>;

// ── Baru: untuk GET /api/dashboard/expense-by-category ─────────
export const categoryChartSchema = z.object({
  _id: z.string(),
  name: z.string(),
  icon: z.string(),
  total: z.number(),
});

export type CategoryChart = z.infer<typeof categoryChartSchema>;

// ── Baru: untuk GET /api/dashboard/income-by-source ────────────
export const sourceChartSchema = z.object({
  _id: z.string(),
  name: z.string(),
  icon: z.string(),
  total: z.number(),
});

export type SourceChart = z.infer<typeof sourceChartSchema>;

// ── Baru: untuk GET /api/income/daily & /api/expense/daily ─────
export const dailyDataSchema = z.object({
  _id: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
  total: z.number(),
});

export type DailyData = z.infer<typeof dailyDataSchema>;
