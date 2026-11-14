import { z } from "zod";
import { categorySchema } from "./categorySchema";

export const expenseSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  category: categorySchema,
  amount: z.number(),
  date: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const expenseFormSchema = z.object({
  category: z.string(),
  amount: z.string().transform((val) => Number(val)),
  date: z.string(),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;
export type ExpenseFormInput = z.input<typeof expenseFormSchema>;
export type ExpenseFormOutput = z.infer<typeof expenseFormSchema>;
