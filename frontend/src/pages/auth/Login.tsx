import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { login } from "../../api/authApi";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/images/svtracker-logo.png";

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login(value);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-full md:pr-5 flex flex-col items-center justify-center gap-7.5 md:gap-9.75">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 font-bold">
            <img src={logo} alt="logo" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="text-bs-m md:text-bs text-cusblack">Svtracker</p>
          </div>
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
                type="text"
                id="email"
                placeholder="madda.athiarahman@gmail.com"
                {...form.register("email")}
                className="input-box"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.email.message}
                </p>
              )}
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
              {form.formState.errors.password && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            disabled={form.formState.isSubmitting}
            className={`${form.formState.isSubmitting ? "bg-cusred" : "bg-cusorange"} h-7 md:h-9 hover:bg-cusred text-cuswhite text-bd-m md:text-bd font-semibold rounded-md cursor-pointer`}
          >
            {form.formState.isSubmitting ? "Loading..." : "Login"}
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
