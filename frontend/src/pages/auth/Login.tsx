import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (value: LoginSchema) => {
    console.log(`halo namaku adalah ${value.email}`);

    //login api
  };

  return (
    <AuthLayout>
      <div className="w-full h-full pr-5 flex flex-col items-center justify-center gap-9.75">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-h3 md:text-h2 text-cusblack font-bold">
            Welcome Back
          </h2>
          <p className="md:text-bd text-center text-cusdarkgrey font-semibold">
            Please enter your credentials to access your account.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-70 md:w-103.5 flex flex-col gap-9.75"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-bd font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="madda.athiarahman@gmail.com"
                {...form.register("email")}
                className="w-full h-9 px-3.75 text-bs font-semibold bg-cuswhite border-2 border-cusdarkgrey rounded-md outline-none focus:border-none focus:ring-2 focus:ring-cusorange text-cusblack placeholder:text-bs placeholder:font-semibold placeholder:text-cusdarkgrey"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-bd font-semibold mb-1">
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
          </div>
          <button className="h-9 bg-cusorange text-cuswhite text-bd font-semibold rounded-md cursor-pointer">
            Login
          </button>
        </form>
        <p className="text-bs text-cusdarkgrey font-semibold">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cusorange cursor-pointer underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
