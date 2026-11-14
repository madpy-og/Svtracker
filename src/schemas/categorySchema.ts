import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
