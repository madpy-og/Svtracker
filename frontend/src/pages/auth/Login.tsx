import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { login } from "../../api/authApi";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (value: LoginSchema) => {
    try {
      const data = await login(value);

      if (!data) {
        console.log("Failed to login");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-full md:pr-5 flex flex-col items-center justify-center gap-7.5 md:gap-9.75">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-h2-m md:text-h2 text-cusblack font-bold">
            Welcome Back
          </h2>
          <p className="text-bs-m md:text-bs text-center text-cusdarkgrey font-semibold">
            Please enter your credentials to access your account.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md flex flex-col gap-9.75"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="madda.athiarahman@gmail.com"
                {...form.register("email")}
                className="input-box"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                {...form.register("password")}
                className="input-box"
              />
            </div>
          </div>
          <button className="h-7 md:h-9 bg-cusorange text-cuswhite text-bd-m md:text-bd font-semibold rounded-md cursor-pointer">
            Login
          </button>
        </form>
        <p className="text-bs-m md:text-bs text-cusdarkgrey font-semibold">
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
