import React, { useEffect } from "react";
import Sidebar from "../ui/Sidebar";
import { Outlet, useLocation } from "react-router";
import Profile from "../ui/Profile";
import Navbar from "../ui/Navbar";
import Drawer from "../ui/Drawer";
import ModalIncome from "../ui/ModalIncome";
import ModalExpense from "../ui/ModalExpense";
import ModalProfile from "../ui/ModalProfile";
import { useUIStore } from "../../store/uiStore";
import { useFinanceStore } from "../../store/financeStore";

const PageTitles: Record<string, string> = {
  "/": "Analytics",
  "/income": "Incomes",
  "/expense": "Expenses",
  "/setting": "Settings",
};

const DashboardLayout = () => {
  const { openDrawer, setOpenDrawer, pageName, setPageName } = useUIStore();
  const { fetchAllData } = useFinanceStore();

  const location = useLocation();

  useEffect(() => {
    const title = PageTitles[location.pathname] || "Analytics";
    setPageName(title);
  }, [location.pathname, setPageName]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);


  return (
    <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] w-screen h-screen bg-cusgrey ">
      {openDrawer && (
        <div
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="fixed inset-0 z-90 bg-black/40 md:hidden transition-opacity duration-300 opacity-100"
        />
      )}

      <ModalProfile />
      <ModalIncome />
      <ModalExpense />

      <Drawer />
      <Navbar />
      <Sidebar />
      <section className="flex-1 overflow-y-auto pb-3.75 pt-12 md:pt-2.5 md:pb-6.5 px-4 md:px-8">
        <div className="flex flex-col gap-3.75">
          <div className="flex justify-between items-center">
            <h4 className="text-cusblack text-h4-m md:text-h4 font-bold pt-4">
              {pageName}
            </h4>
            <Profile
              variant="horizontal"
              className="hidden md:flex"
            />
          </div>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
