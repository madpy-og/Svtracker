import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type {
  IncomeFormInput,
  IncomeFormOutput,
} from "../../schemas/incomeSchema";
import type { SourceSchema } from "../../schemas/sourceSchema";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  form: UseFormReturn<IncomeFormInput, unknown, IncomeFormOutput>;
  handleSubmit: (value: IncomeFormOutput) => Promise<void>;
  source: SourceSchema[];
  closeModal: () => void;
};

const FormAddIncome = ({ form, handleSubmit, source, closeModal }: Props) => {
  const sourceOptions = source.map((s) => ({
    label: s.name,
    value: s._id,
  }));
  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={form.handleSubmit(handleSubmit)} id="add-income-form">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="source"
              className="text-bd-m md:text-bd font-semibold mb-1 text-cusblack"
            >
              Source
            </label>
            <CustomSelect
              fieldName="source"
              form={form}
              options={sourceOptions}
              placeholder="Choose a source"
              error={form.formState.errors.source?.message}
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
          className="px-4 h-9 md:h-10 border border-cusdarkgrey hover:bg-cusgrey text-cusblack text-bd-m md:text-bd font-semibold rounded-md transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="add-income-form"
          disabled={form.formState.isSubmitting}
          className={`${form.formState.isSubmitting ? "bg-cusred opacity-70" : "bg-cusorange hover:bg-cusred"} px-5 h-9 md:h-10 text-cuswhite text-bd-m md:text-bd font-semibold rounded-md shadow-md transition-all active:scale-95 cursor-pointer`}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Income"}
        </button>
      </div>
    </div>
  );
};

export default FormAddIncome;
