import { create } from "zustand";
import { getUserById } from "../api/userApi";
import { getAllIncome, addIncome as apiAddIncome } from "../api/incomeApi";
import { getAllExpense, addExpense as apiAddExpense } from "../api/expenseApi";
import { getAllSource } from "../api/sourceApi";
import { getAllCategory } from "../api/categoryApi";
import { getDashboard } from "../api/dashboardApi";

import type { UserSchema } from "../schemas/userSchema";
import type { IncomeSchema, IncomeFormOutput } from "../schemas/incomeSchema";
import type { ExpenseSchema, ExpenseFormOutput } from "../schemas/expenseSchema";
import type { SourceSchema } from "../schemas/sourceSchema";
import type { CategorySchema } from "../schemas/categorySchema";
import type { DashboardSchema } from "../schemas/dashboardSchema";

interface FinanceState {
  profile: UserSchema | null;
  income: IncomeSchema[];
  expense: ExpenseSchema[];
  source: SourceSchema[];
  category: CategorySchema[];
  dashboard: DashboardSchema | null;
  
  isLoading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  fetchIncome: () => Promise<void>;
  fetchExpense: () => Promise<void>;
  fetchSource: () => Promise<void>;
  fetchCategory: () => Promise<void>;
  fetchDashboard: () => Promise<void>;
  fetchAllData: () => Promise<void>;

  createIncome: (data: IncomeFormOutput) => Promise<void>;
  createExpense: (data: ExpenseFormOutput) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  profile: null,
  income: [],
  expense: [],
  source: [],
  category: [],
  dashboard: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      const data = await getUserById();
      if (data) set({ profile: data });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  },

  fetchIncome: async () => {
    try {
      const data = await getAllIncome();
      if (data) set({ income: data });
    } catch (err) {
      console.error("Failed to fetch income", err);
    }
  },

  fetchExpense: async () => {
    try {
      const data = await getAllExpense();
      if (data) set({ expense: data });
    } catch (err) {
      console.error("Failed to fetch expense", err);
    }
  },

  fetchSource: async () => {
    try {
      const data = await getAllSource();
      if (data) set({ source: data });
    } catch (err) {
      console.error("Failed to fetch sources", err);
    }
  },

  fetchCategory: async () => {
    try {
      const data = await getAllCategory();
      if (data) set({ category: data });
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  },

  fetchDashboard: async () => {
    try {
      const data = await getDashboard();
      if (data) set({ dashboard: data });
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  },

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        get().fetchProfile(),
        get().fetchIncome(),
        get().fetchExpense(),
        get().fetchSource(),
        get().fetchCategory(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      console.error(err);
      set({ error: "Gagal memuat beberapa data finansial" });
    } finally {
      set({ isLoading: false });
    }
  },

  createIncome: async (formData) => {
    set({ isLoading: true });
    try {
      await apiAddIncome(formData);
      await Promise.all([
        get().fetchIncome(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      console.error("Failed to add income", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  createExpense: async (formData) => {
    set({ isLoading: true });
    try {
      await apiAddExpense(formData);
      await Promise.all([
        get().fetchExpense(),
        get().fetchDashboard()
      ]);
    } catch (err) {
      console.error("Failed to add expense", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  }
}));
