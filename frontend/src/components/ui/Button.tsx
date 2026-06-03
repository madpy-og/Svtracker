import { Pen, Plus } from "lucide-react";
import React from "react";
import { useUIStore } from "../../store/uiStore";

type AddProps = {
  variant: "addIncome" | "addExpense";
};

type EditProps = {
  variant: "editProfile";
  style: "vertical" | "horizontal";
};

export const AddButton = ({ variant }: AddProps) => {
  const { setOpenModal } = useUIStore();

  return (
    <button
      onClick={() => setOpenModal(variant)}
      className="flex justify-center items-center gap-1 text-bs-m md:text-bs text-cuswhite font-semibold bg-cusorange rounded-lg pl-2 pr-2.5 py-1.25 hover:bg-cusred cursor-pointer"
    >
      <Plus className="w-4 h-4" />
      {variant === "addIncome" ? "Add Income" : "Add Expense"}
    </button>
  );
};

export const EditButton = ({ variant, style }: EditProps) => {
  const { setOpenModal, setOpenDrawer } = useUIStore();

  const handleClick = () => {
    setOpenModal(variant);
    setOpenDrawer(false);
  };
  return (
    <button
      onClick={handleClick}
      className={`${style === "horizontal" ? "right-0 bottom-0" : "right-1 bottom-0"} absolute bg-cusorange rounded-full p-1 flex justify-center items-center shadow-lg z-10 cursor-pointer`}
    >
      <Pen
        size={`${style === "horizontal" ? 8 : 10}`}
        strokeWidth={3}
        className="text-cuswhite"
      />
    </button>
  );
};
