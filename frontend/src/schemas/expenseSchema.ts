import { optional, z } from "zod";

export const expenseSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  icon: z.string(),
  category: z.string(),
  amount: z.string().transform((val) => Number(val)),
  date: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;
export type ExpenseSchemaInput = z.input<typeof expenseSchema>;
