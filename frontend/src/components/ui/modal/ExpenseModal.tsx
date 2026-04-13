import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseFormSchema,
  type ExpenseFormInput,
  type ExpenseFormOutput,
  type ExpenseSchema,
} from "../../../schemas/expenseSchema";
import { addExpense } from "../../../api/expenseApi";
import AddExpenseForm from "../form/AddExpenseForm";
import Card from "../Card";
import type { CategorySchema } from "../../../schemas/categorySchema";

type Props = {
  openModal: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  onSuccess: () => void;
  category: CategorySchema[];
};

const ExpenseModal = ({
  openModal,
  setOpenModal,
  onSuccess,
  category,
}: Props) => {
  const form = useForm<ExpenseFormInput, unknown, ExpenseFormOutput>({
    resolver: zodResolver(expenseFormSchema),
  });

  const handleSubmit = async (value: ExpenseFormOutput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addExpense(value);

      onSuccess?.();
      setOpenModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "addExpense") {
    return (
      <>
        <div
          onClick={() => {
            setOpenModal(null);
          }}
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

export default ExpenseModal;
