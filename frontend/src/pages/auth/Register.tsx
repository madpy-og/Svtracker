import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router";
import { register } from "../../api/authApi";
import logo from "../../assets/images/svtracker-logo.png";

const registerSchema = z
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

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await register(value);

    if (!data) {
      console.log("Failed to register account");
    }

    navigate("/login");
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
            Create an Account
          </h2>
          <p className="text-bs-md md:text-bs text-center text-cusdarkgrey font-semibold">
            Please enter your credentials to create an account.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md flex flex-col gap-9.75"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <label
                htmlFor="fullname"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Madda Athia Rahman"
                {...form.register("fullname")}
                className="input-box"
              />
              {form.formState.errors.fullname && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.fullname.message}
                </p>
              )}
            </div>
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
            <div>
              <div className="grid grid-cols-2 gap-3.5">
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
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-bd-m md:text-bd font-semibold mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••••"
                    {...form.register("confirmPassword")}
                    className="input-box"
                  />
                </div>
              </div>
              {(form.formState.errors.password ||
                form.formState.errors.confirmPassword) && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {[
                    form.formState.errors.password?.message,
                    form.formState.errors.confirmPassword?.message,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={form.formState.isSubmitting}
            className={`${form.formState.isSubmitting ? "bg-cusred" : "bg-cusorange"} h-7 md:h-9 hover:bg-cusred text-cuswhite text-bd-m md:text-bd font-semibold rounded-md cursor-pointer`}
          >
            {form.formState.isSubmitting ? "Loading..." : "Register"}
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
