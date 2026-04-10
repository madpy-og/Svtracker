import React from "react";
import Card from "../../components/ui/Card";
import { useExpense } from "../../hooks/useExpense";
import ExpenseList from "../../components/ui/list/ExpenseList";
import Button from "../../components/ui/Button";

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
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-bd-m md:text-bd text-cusblack font-semibold">
              Expense Category
            </p>
            <Button variant="addExpense" />
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
