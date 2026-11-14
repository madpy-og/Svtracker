import { z } from "zod";

export const sourceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SourceSchema = z.infer<typeof sourceSchema>;
