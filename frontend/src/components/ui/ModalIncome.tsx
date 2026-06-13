import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
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
          className="fixed inset-0 z-90 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px]">
          <Card className="relative w-full shadow-2xl p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-cusgrey pb-3">
              <h2 className="text-h5-m md:text-h5 font-bold text-cusblack">Add New Income</h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-md text-cusdarkgrey hover:bg-cusgrey hover:text-cusblack transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <FormAddIncome
              form={form}
              handleSubmit={handleSubmit}
              source={source}
              closeModal={closeModal}
            />
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ModalIncome;
