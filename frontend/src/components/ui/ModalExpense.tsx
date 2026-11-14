import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  expenseFormSchema,
  type ExpenseFormInput,
  type ExpenseFormOutput,
} from "../../schemas/expenseSchema";
import AddExpenseForm from "./FormAddExpense";
import Card from "./Card";
import { useUIStore } from "../../store/uiStore";
import { useGetCategories } from "../../hooks/useCategory";
import { useAddExpense } from "../../hooks/useExpense";

const ModalExpense = () => {
  const { openModal, closeModal } = useUIStore();
  const { data: category = [] } = useGetCategories();
  const { mutateAsync: createExpense } = useAddExpense();

  const form = useForm<ExpenseFormInput, unknown, ExpenseFormOutput>({
    resolver: zodResolver(expenseFormSchema),
  });

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  const handleSubmit = async (value: ExpenseFormOutput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await createExpense(value);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "addExpense") {
    return (
      <>
        <div
          onClick={handleClose}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-300 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px]">
          <Card className="relative w-full shadow-2xl p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-cusgrey pb-3">
              <h2 className="text-h5-m md:text-h5 font-bold text-cusblack">Add New Expense</h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-md text-cusdarkgrey hover:bg-cusgrey hover:text-cusblack transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <AddExpenseForm
              form={form}
              handleSubmit={handleSubmit}
              category={category}
              closeModal={handleClose}
            />
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalExpense;
