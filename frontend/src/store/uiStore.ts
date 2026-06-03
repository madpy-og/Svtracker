import { create } from "zustand";

export type ModalType = "addIncome" | "addExpense" | "editProfile" | null;

interface UIState {
  openModal: ModalType;
  openDrawer: boolean;
  pageName: string;

  setOpenModal: (modal: ModalType) => void;
  closeModal: () => void;
  setOpenDrawer: (open: boolean) => void;
  toggleDrawer: () => void;
  setPageName: (name: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  openModal: null,
  openDrawer: false,
  pageName: "",

  setOpenModal: (modal) => set({ openModal: modal }),
  closeModal: () => set({ openModal: null }),
  setOpenDrawer: (open) => set({ openDrawer: open }),
  toggleDrawer: () => set((state) => ({ openDrawer: !state.openDrawer })),
  setPageName: (name) => set({ pageName: name }),
}));
