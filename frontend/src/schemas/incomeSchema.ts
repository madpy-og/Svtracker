import { z } from "zod";

export const incomeSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  icon: z.string(),
  source: z.string(),
  amount: z.number(),
  date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IncomeSchema = z.infer<typeof incomeSchema>;
