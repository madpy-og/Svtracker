import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllIncome,
  addIncome,
  deleteIncome,
  getDailyIncome,
} from "../api/incomeApi";
import type { IncomeFormOutput } from "../schemas/incomeSchema";

export const incomeKeys = {
  all: ["incomes"] as const,
  daily: (days: number) => ["incomes", "daily", days] as const,
};

export const useGetIncomes = () => {
  return useQuery({
    queryKey: incomeKeys.all,
    queryFn: getAllIncome,
  });
};

export const useGetDailyIncome = (days = 30) => {
  return useQuery({
    queryKey: incomeKeys.daily(days),
    queryFn: () => getDailyIncome(days),
  });
};

export const useAddIncome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IncomeFormOutput) => addIncome(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: incomeKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useDeleteIncome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: incomeKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
