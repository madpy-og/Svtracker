import { useQuery } from "@tanstack/react-query";
import {
  getDashboard,
  getMonthlySummary,
  getExpenseByCategory,
  getIncomeBySource,
} from "../api/dashboardApi";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  main: () => [...dashboardKeys.all, "main"] as const,
  monthlySummary: () => [...dashboardKeys.all, "monthlySummary"] as const,
  expenseByCategory: () => [...dashboardKeys.all, "expenseByCategory"] as const,
  incomeBySource: () => [...dashboardKeys.all, "incomeBySource"] as const,
};

export const useGetDashboard = () => {
  return useQuery({
    queryKey: dashboardKeys.main(),
    queryFn: getDashboard,
  });
};

export const useGetMonthlySummary = () => {
  return useQuery({
    queryKey: dashboardKeys.monthlySummary(),
    queryFn: getMonthlySummary,
  });
};

export const useGetExpenseByCategory = () => {
  return useQuery({
    queryKey: dashboardKeys.expenseByCategory(),
    queryFn: getExpenseByCategory,
  });
};

export const useGetIncomeBySource = () => {
  return useQuery({
    queryKey: dashboardKeys.incomeBySource(),
    queryFn: getIncomeBySource,
  });
};
