import { z } from "zod";

export const expenseSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  icon: z.string(),
  category: z.string(),
  amount: z.number(),
  date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;
