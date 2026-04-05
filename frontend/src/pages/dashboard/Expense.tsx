import React from "react";
import Card from "../../components/ui/Card";
import { useExpense } from "../../hooks/useExpense";
import ExpenseList from "../../components/ui/ExpenseList";

const Expense = () => {
  const { expense } = useExpense();

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-1 h-60 gap-2.5">
        <Card>
          <div></div>
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-2.5">
        <Card>
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Expense History
          </p>
          <div className="overflow-y-auto">
            <ExpenseList datas={expense} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Expense;
