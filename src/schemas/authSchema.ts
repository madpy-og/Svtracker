import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .email("email format not valid")
    .min(5, "email must have at least 5 characters"),
  password: z
    .string()
    .nonempty("password is required")
    .min(3, "password must have at least 3 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .nonempty("fullname is required")
      .min(3, "fullname must have at least 3 characters"),
    email: z
      .string()
      .nonempty("email is required")
      .min(5, "email must have at least 5 characters"),
    password: z
      .string()
      .nonempty("password is required")
      .min(3, "password must have at least 3 characters"),
    confirmPassword: z
      .string()
      .nonempty("please confirm your password")
      .min(3, "confirm password must have at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm password does not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
