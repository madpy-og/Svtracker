import { z } from "zod";

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
    transactions: z.array(z.object({})),
  }),
  recentTransactions: z.array(z.object({})),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;
