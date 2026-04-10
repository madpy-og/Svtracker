import { z } from "zod";

export const incomeSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  icon: z.string(),
  source: z.string(),
  amount: z.string().transform((val) => Number(val)),
  date: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type IncomeSchema = z.infer<typeof incomeSchema>;
export type IncomeSchemaInput = z.input<typeof incomeSchema>;
