import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type {
  IncomeFormInput,
  IncomeFormOutput,
} from "../../../schemas/incomeSchema";
import type { SourceSchema } from "../../../schemas/sourceSchema";

type Props = {
  form: UseFormReturn<IncomeFormInput, unknown, IncomeFormOutput>;
  handleSubmit: (value: IncomeFormOutput) => Promise<void>;
  source: SourceSchema[];
};

const AddIncomeForm = ({ form, handleSubmit, source }: Props) => {
  return (
    <div className="p-2 flex flex-col gap-4">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col">
            <label
              htmlFor="source"
              className="text-bd-m md:text-bd font-semibold mb-1"
            >
              Source
            </label>
            <select
              id="source"
              {...form.register("source")}
              className="select-box"
            >
              {source.map((s) => {
                return (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
            {form.formState.errors.source && (
              <p className="mt-1 text-bs-m md:text-bs text-danger">
                {form.formState.errors.source.message}
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
        </div>
      </form>
      <div className="flex justify-end">
        <button
          disabled={form.formState.isSubmitting}
          className={`${form.formState.isSubmitting ? "bg-cusred" : "bg-cusorange"} px-4 h-7 md:h-9 hover:bg-cusred text-cuswhite text-bd-m md:text-bd font-semibold rounded-md cursor-pointer`}
        >
          {form.formState.isSubmitting ? "Loading..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
