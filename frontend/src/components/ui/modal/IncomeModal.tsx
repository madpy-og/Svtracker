import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  incomeFormSchema,
  type IncomeFormInput,
  type IncomeFormOutput,
} from "../../../schemas/incomeSchema";
import { addIncome } from "../../../api/incomeApi";
import AddIncomeForm from "../form/AddIncomeForm";
import Card from "../Card";
import type { SourceSchema } from "../../../schemas/sourceSchema";

type Props = {
  openModal: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  onSuccess: () => void;
  source: SourceSchema[];
};

const IncomeModal = ({ openModal, setOpenModal, onSuccess, source }: Props) => {
  const form = useForm<IncomeFormInput, unknown, IncomeFormOutput>({
    resolver: zodResolver(incomeFormSchema),
  });

  const handleSubmit = async (value: IncomeFormOutput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addIncome(value);

      onSuccess?.();
      setOpenModal(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (openModal === "addIncome") {
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
            <AddIncomeForm
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

export default IncomeModal;
