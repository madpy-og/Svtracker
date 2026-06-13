import React from "react";
import type {
  ExpenseFormInput,
  ExpenseFormOutput,
  ExpenseSchema,
} from "../../schemas/expenseSchema";
import type { UseFormReturn } from "react-hook-form";
import type { CategorySchema } from "../../schemas/categorySchema";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  form: UseFormReturn<ExpenseFormInput, unknown, ExpenseFormOutput>;
  handleSubmit: (value: ExpenseFormOutput) => Promise<void>;
  category: CategorySchema[];
  closeModal: () => void;
};

const FormAddExpense = ({ form, handleSubmit, category, closeModal }: Props) => {
  const categoryOptions = category.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={form.handleSubmit(handleSubmit)} id="add-expense-form">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-bd-m md:text-bd font-semibold mb-1 text-cusblack"
            >
              Category
            </label>
            <CustomSelect
              fieldName="category"
              form={form}
              options={categoryOptions}
              placeholder="Choose a category"
              error={form.formState.errors.category?.message}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-bd-m md:text-bd font-semibold mb-1 text-cusblack"
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
              className="text-bd-m md:text-bd font-semibold mb-1 text-cusblack"
            >
              Date
            </label>
            <CustomDatePicker
              fieldName="date"
              form={form}
              placeholder="YY-MM-DD"
              error={form.formState.errors.date?.message}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={closeModal}
          disabled={form.formState.isSubmitting}
          className="px-4 h-9 md:h-10 border border-cusdarkgrey hover:bg-cusgrey text-cusblack text-bd-m md:text-bd font-semibold rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="add-expense-form"
          disabled={form.formState.isSubmitting}
          className={`${form.formState.isSubmitting ? "bg-cusred opacity-70" : "bg-cusorange hover:bg-cusred"} px-5 h-9 md:h-10 text-cuswhite text-bd-m md:text-bd font-semibold rounded-md shadow-md transition-all active:scale-95 cursor-pointer`}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Expense"}
        </button>
      </div>
    </div>
  );
};

export default FormAddExpense;
