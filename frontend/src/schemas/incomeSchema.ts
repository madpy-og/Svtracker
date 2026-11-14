import { z } from "zod";
import { sourceSchema } from "./sourceSchema";

export const incomeSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  source: sourceSchema,
  amount: z.number(),
  date: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const incomeFormSchema = z.object({
  source: z.string(),
  amount: z.string().transform((val) => Number(val)),
  date: z.string(),
});

export type IncomeSchema = z.infer<typeof incomeSchema>;
export type IncomeFormInput = z.input<typeof incomeFormSchema>;
export type IncomeFormOutput = z.infer<typeof incomeFormSchema>;
