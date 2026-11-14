import type {
  ExpenseFormInput,
  ExpenseFormOutput,
  ExpenseSchema,
} from "../schemas/expenseSchema";
import type { DailyData } from "../schemas/dashboardSchema";

export const getAllExpense = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/expenses`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get expense data");
      return
    }

    const data = await res.json();

    return data.expense;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addExpense = async ({
  category,
  amount,
  date,
}: ExpenseFormOutput) => {
  try {
    const newExpense = {
      category,
      amount,
      date,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/expenses`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    if (!res.ok) {
      console.log("Failed to add expense data");
      return
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/expenses/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to delete expense data");
      return
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const getDailyExpense = async (days = 30): Promise<DailyData[] | undefined> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/expenses/daily?days=${days}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get daily expense data");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
