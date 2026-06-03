import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseFormSchema,
  type ExpenseFormInput,
  type ExpenseFormOutput,
} from "../../schemas/expenseSchema";
import AddExpenseForm from "./FormAddExpense";
import Card from "./Card";
import { useUIStore } from "../../store/uiStore";
import { useFinanceStore } from "../../store/financeStore";

const ModalExpense = () => {
  const { openModal, closeModal } = useUIStore();
  const { category, createExpense } = useFinanceStore();

  const form = useForm<ExpenseFormInput, unknown, ExpenseFormOutput>({
    resolver: zodResolver(expenseFormSchema),
  });

  const handleSubmit = async (value: ExpenseFormOutput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await createExpense(value);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "addExpense") {
    return (
      <>
        <div
          onClick={closeModal}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-30 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card className="relative w-90">
            <AddExpenseForm
              form={form}
              handleSubmit={handleSubmit}
              category={category}
            />
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalExpense;
