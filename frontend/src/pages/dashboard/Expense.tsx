import React from "react";
import Card from "../../components/ui/Card";
import ListExpense from "../../components/ui/ListExpense";
import { AddButton } from "../../components/ui/Button";
import { useFinanceStore } from "../../store/financeStore";
import ExpenseMonthlyBarChart from "../../components/charts/ExpenseMonthlyBarChart";

const Expense = () => {
  const { expense, monthlySummary } = useFinanceStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 h-60 gap-3">
        <Card className="flex flex-col gap-2">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Expense Per Month
          </p>
          <ExpenseMonthlyBarChart expenseByMonth={monthlySummary?.expenseByMonth || []} />
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-3">
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-bd-m md:text-bd text-cusblack font-semibold">
              Expense Category
            </p>
            <AddButton variant="addExpense" />
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-1 md:gap-2">
            <ListExpense datas={expense} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Expense;
