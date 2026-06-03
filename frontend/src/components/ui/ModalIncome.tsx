import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  incomeFormSchema,
  type IncomeFormInput,
  type IncomeFormOutput,
} from "../../schemas/incomeSchema";
import FormAddIncome from "./FormAddIncome";
import Card from "./Card";
import { useUIStore } from "../../store/uiStore";
import { useFinanceStore } from "../../store/financeStore";

const ModalIncome = () => {
  const { openModal, closeModal } = useUIStore();
  const { source, createIncome } = useFinanceStore();

  const form = useForm<IncomeFormInput, unknown, IncomeFormOutput>({
    resolver: zodResolver(incomeFormSchema),
  });

  const handleSubmit = async (value: IncomeFormOutput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await createIncome(value);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "addIncome") {
    return (
      <>
        <div
          onClick={closeModal}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-30 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card className="relative w-90">
            <FormAddIncome
              form={form}
              handleSubmit={handleSubmit}
              source={source}
            />
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalIncome;
