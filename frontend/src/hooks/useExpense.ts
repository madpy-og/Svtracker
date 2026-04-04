import { useState, useEffect } from "react";
import { getAllExpense } from "../api/expenseApi";
import type { ExpenseSchema } from "../schemas/expenseSchema";

export const useExpense = async () => {
  const [expense, setExpense] = useState<ExpenseSchema | null>(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getAllExpense();

        if (!data) {
          console.log("Something went wrong");
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
