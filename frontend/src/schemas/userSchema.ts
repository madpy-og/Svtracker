import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  fullname: z.string(),
  email: z.email(),
  profileImage: z.object({
    url: z.string(),
    publicId: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
