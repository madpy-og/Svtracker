import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { expenseSchema, type ExpenseSchema } from "../../schemas/expenseSchema";
import { addExpense } from "../../api/expenseApi";

const ExpenseModal = () => {
  const form = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      icon: "",
      category: "",
      amount: 0,
      date: "",
    },
  });

  const handleSubmit = async (value: ExpenseSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addExpense(value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="relative bg-cuswhite rounded-lg p-6 w-130 h-140 ">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <label
                htmlFor="icon"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Icon
              </label>
              <input
                type="text"
                id="icon"
                placeholder="blasbald"
                {...form.register("icon")}
                className="input-box"
              />
              {form.formState.errors.icon && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.icon.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                placeholder="tax"
                {...form.register("category")}
                className="input-box"
              />
              {form.formState.errors.category && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="amount"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                placeholder="500000"
                {...form.register("amount")}
                className="input-box"
              />
              {form.formState.errors.amount && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="text-bd-m md:text-bd font-semibold mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                placeholder="YY-MM-DD"
                {...form.register("date")}
                className="input-box"
              />
              {form.formState.errors.date && (
                <p className="mt-1 text-bs-m md:text-bs text-danger">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>
            <button
              disabled={form.formState.isSubmitting}
              className={`${form.formState.isSubmitting ? "bg-cusred" : "bg-cusorange"} h-7 md:h-9 hover:bg-cusred text-cuswhite text-bd-m md:text-bd font-semibold rounded-md cursor-pointer`}
            >
              {form.formState.isSubmitting ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
