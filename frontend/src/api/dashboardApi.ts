import type {
  MonthlySummary,
  CategoryChart,
  SourceChart,
} from "../schemas/dashboardSchema";

export const getDashboard = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/dashboard`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get dashboard data");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const getMonthlySummary = async (): Promise<MonthlySummary | undefined> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/dashboard/monthly-summary`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get monthly summary");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const getExpenseByCategory = async (): Promise<CategoryChart[] | undefined> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/dashboard/expense-by-category`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get expense by category");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const getIncomeBySource = async (): Promise<SourceChart[] | undefined> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/dashboard/income-by-source`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get income by source");
      return;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
