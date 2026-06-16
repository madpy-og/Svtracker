import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllExpense,
  addExpense,
  deleteExpense,
  getDailyExpense,
} from "../api/expenseApi";
import type { ExpenseFormOutput } from "../schemas/expenseSchema";

export const expenseKeys = {
  all: ["expenses"] as const,
  daily: (days: number) => ["expenses", "daily", days] as const,
};

export const useGetExpenses = () => {
  return useQuery({
    queryKey: expenseKeys.all,
    queryFn: getAllExpense,
  });
};

export const useGetDailyExpense = (days = 30) => {
  return useQuery({
    queryKey: expenseKeys.daily(days),
    queryFn: () => getDailyExpense(days),
  });
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExpenseFormOutput) => addExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
