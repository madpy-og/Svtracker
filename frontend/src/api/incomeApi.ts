const BASE_URL = "http://localhost:3000/api/v1";

type Income = {
  icon: string;
  source: string;
  amount: number;
  date: Date;
};

export const getAllIncome = async () => {
  try {
    const res = await fetch(`${BASE_URL}/incomes`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get income data");
    }

    const data = await res.json();

    return data.income;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addIncome = async ({ icon, source, amount, date }: Income) => {
  try {
    const newIncome = {
      icon,
      source,
      amount,
      date,
    };

    const res = await fetch(`${BASE_URL}/incomes`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIncome),
    });

    if (!res.ok) {
      console.log("Failed to add income data");
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const deleteIncome = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/incomes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to delete income data");
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};
