type Expense = {
  icon: string;
  category: string;
  amount: number;
  date: Date;
};

export const getAllExpense = async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}/api/v1/expenses`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get expense data");
    }

    const data = await res.json();

    return data.expense;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addExpense = async ({ icon, category, amount, date }: Expense) => {
  try {
    const newExpense = {
      icon,
      category,
      amount,
      date,
    };

    const res = await fetch(`${import.meta.env.BASE_URL}/api/v1/expenses`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    if (!res.ok) {
      console.log("Failed to add expense data");
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
      `${import.meta.env.BASE_URL}/api/v1/expenses/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to delete expense data");
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};
