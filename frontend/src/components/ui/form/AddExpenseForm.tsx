import React from "react";
import type {
  ExpenseFormInput,
  ExpenseFormOutput,
  ExpenseSchema,
} from "../../../schemas/expenseSchema";
import type { UseFormReturn } from "react-hook-form";
import type { CategorySchema } from "../../../schemas/categorySchema";

type Props = {
  form: UseFormReturn<ExpenseFormInput, unknown, ExpenseFormOutput>;
  handleSubmit: (value: ExpenseFormOutput) => Promise<void>;
  category: CategorySchema[];
};

const AddExpenseForm = ({ form, handleSubmit, category }: Props) => {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-bd-m md:text-bd font-semibold mb-1"
          >
            Category
          </label>
          <select
            id="category"
            {...form.register("category")}
            className="select-box"
          >
            {category.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
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
  );
};

export default AddExpenseForm;
