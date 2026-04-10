import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseSchema,
  type ExpenseSchema,
  type ExpenseSchemaInput,
} from "../../../schemas/expenseSchema";
import { addExpense } from "../../../api/expenseApi";
import AddExpenseForm from "../form/AddExpenseForm";

type Props = {
  openModal: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
};

const ExpenseModal = ({ openModal, setOpenModal }: Props) => {
  const form = useForm<ExpenseSchemaInput, unknown, ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      icon: "",
      category: "",
      amount: "",
      date: "",
    },
  });

  const handleSubmit = async (value: ExpenseSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addExpense(value);

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
          <div className="relative bg-cuswhite rounded-lg p-6 w-130 h-140 ">
            <AddExpenseForm form={form} handleSubmit={handleSubmit} />
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default ExpenseModal;
