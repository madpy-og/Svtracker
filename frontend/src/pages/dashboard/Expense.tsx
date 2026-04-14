import React from "react";
import Card from "../../components/ui/Card";
import ExpenseList from "../../components/ui/list/ExpenseList";
import { AddButton } from "../../components/ui/Button";
import type { ExpenseSchema } from "../../schemas/expenseSchema";
import { useOutletContext } from "react-router";

type OutletContext = {
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  expense: ExpenseSchema[];
};

const Expense = () => {
  const { setOpenModal, expense } = useOutletContext<OutletContext>();

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-1 h-60 gap-2.5">
        <Card>
          <div></div>
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-2.5">
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-bd-m md:text-bd text-cusblack font-semibold">
              Expense Category
            </p>
            <AddButton variant="addExpense" setOpenModal={setOpenModal} />
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-1 md:gap-2">
            <ExpenseList datas={expense} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Expense;
