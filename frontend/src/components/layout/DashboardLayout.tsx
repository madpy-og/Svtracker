import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../ui/main/Sidebar";
import { Outlet, useLocation } from "react-router";
import Profile from "../ui/main/Profile";
import Navbar from "../ui/main/Navbar";
import Drawer from "../ui/main/Drawer";
import IncomeModal from "../ui/modal/IncomeModal";
import ExpenseModal from "../ui/modal/ExpenseModal";
import { useIncome } from "../../hooks/useIncome";
import { useExpense } from "../../hooks/useExpense";
import { useUser } from "../../hooks/useUser";

const PageTitles: Record<string, string> = {
  "/": "Analytics",
  "/income": "Incomes",
  "/expense": "Expenses",
  "/setting": "Settings",
};

const DashboardLayout = () => {
  const [pageName, setPageName] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const { income, refetchIncomeData } = useIncome();
  const { expense, refetchExpenseData } = useExpense();
  const { profile, refetchUserData } = useUser();

  const location = useLocation();

  useEffect(() => {
    const title = PageTitles[location.pathname];
    setPageName(title);
  }, [location.pathname]);

  const handleHamburger = async () => {
    setOpenDrawer(true);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] w-screen h-screen bg-cusgrey ">
      {openDrawer && (
        <div
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="fixed inset-0 z-90 bg-black/40 md:hidden transition-opacity duration-300
      opacity-100"
        />
      )}

      <IncomeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSuccess={refetchIncomeData}
      />
      <ExpenseModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onSuccess={refetchExpenseData}
      />
      <Drawer
        user={profile}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Navbar handleHamburger={handleHamburger} />
      <Sidebar />
      <section className="flex-1 overflow-y-auto pb-3.75 pt-12 md:pt-2.5 md:pb-6.5 px-4 md:px-8">
        <div className="flex flex-col gap-3.75">
          <div className="flex justify-between items-center">
            <h4 className="text-cusblack text-h4-m md:text-h4 font-bold pt-4">
              {pageName}
            </h4>
            <Profile
              variant="horizontal"
              user={profile}
              className="hidden md:flex"
            />
          </div>
          <Outlet
            context={{
              setOpenModal: setOpenModal,
              income: income,
              expense: expense,
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
