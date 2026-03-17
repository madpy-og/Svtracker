import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link } from "react-router";

const registerSchema = z
  .object({
    fullname: z.string().min(3),
    email: z.string().min(3),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Must be same with password input!",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (value: RegisterSchema) => {
    console.log(`Nama saya adalah ${value.fullname}`);
  };
  return (
    <AuthLayout>
      <div className="w-full h-full pr-5 flex flex-col items-center justify-center gap-9.75">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-h3 md:text-h2 text-cusblack font-bold">
            Create an Account
          </h2>
          <p className="md:text-bd text-center text-cusdarkgrey font-semibold">
            Please enter your credentials to create an account.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-70 md:w-103.5 flex flex-col gap-9.75"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-bd font-semibold mb-1">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Madda Athia Rahman"
                {...form.register("fullname")}
                className="w-full h-9 px-3.75 text-bs font-semibold bg-cuswhite border-2 border-cusdarkgrey rounded-md outline-none focus:border-none focus:ring-2 focus:ring-cusorange text-cusblack placeholder:text-bs placeholder:font-semibold placeholder:text-cusdarkgrey"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-bd font-semibold mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="madda.athiarahman@gmail.com"
                {...form.register("email")}
                className="w-full h-9 px-3.75 text-bs font-semibold bg-cuswhite border-2 border-cusdarkgrey rounded-md outline-none focus:border-none focus:ring-2 focus:ring-cusorange text-cusblack placeholder:text-bs placeholder:font-semibold placeholder:text-cusdarkgrey"
              />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-bd font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••"
                  {...form.register("password")}
                  className="w-full h-9 px-3.75 text-bs font-semibold bg-cuswhite border-2 border-cusdarkgrey rounded-md outline-none focus:border-none focus:ring-2 focus:ring-cusorange text-cusblack placeholder:text-bs placeholder:text-cusdarkgrey"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-bd font-semibold mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••••"
                  {...form.register("confirmPassword")}
                  className="w-full h-9 px-3.75 text-bs font-semibold bg-cuswhite border-2 border-cusdarkgrey rounded-md outline-none focus:border-none focus:ring-2 focus:ring-cusorange text-cusblack placeholder:text-bs placeholder:text-cusdarkgrey"
                />
              </div>
            </div>
          </div>
          <button className="h-9 bg-cusorange text-cuswhite text-bd font-semibold rounded-md cursor-pointer">
            Register
          </button>
        </form>
        <p className="text-bs text-cusdarkgrey font-semibold">
          Do you already have an account?{" "}
          <Link to="/login" className="text-cusorange cursor-pointer underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
