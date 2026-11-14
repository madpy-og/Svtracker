import type { IncomeFormOutput, IncomeSchema } from "../schemas/incomeSchema";
import type { DailyData } from "../schemas/dashboardSchema";

export const getAllIncome = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/incomes`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get income data");
      return
    }

    const data = await res.json();

    return data.income;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addIncome = async ({ source, amount, date }: IncomeFormOutput) => {
  try {
    const newIncome = {
      source,
      amount,
      date,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/incomes`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIncome),
    });

    if (!res.ok) {
      console.log("Failed to add income data");
      return
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const deleteIncome = async (id: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/incomes/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to delete income data");
      return
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const getDailyIncome = async (days = 30): Promise<DailyData[] | undefined> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/incomes/daily?days=${days}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get daily income data");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
