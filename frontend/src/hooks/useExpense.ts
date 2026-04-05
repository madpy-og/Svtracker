import { useState, useEffect } from "react";
import { getAllExpense } from "../api/expenseApi";
import type { ExpenseSchema } from "../schemas/expenseSchema";

export const useExpense = () => {
  const [expense, setExpense] = useState<ExpenseSchema[]>([]);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getAllExpense();

        if (!data) {
          console.log("Something went wrong");
          return;
        }

        setExpense(data);
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchExpenseData();
  }, []);

  return { expense };
};
