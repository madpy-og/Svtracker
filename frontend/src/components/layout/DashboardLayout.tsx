import React, { useEffect, type ReactNode } from "react";
import { useState } from "react";
import Sidebar from "../ui/Sidebar";
import { Outlet, useLocation } from "react-router";
import Profile from "../ui/Profile";

const PageTitles: Record<string, string> = {
  "/": "Analytics",
  "/income": "Incomes",
  "/expense": "Expenses",
  "/setting": "Settings",
};

const DashboardLayout = () => {
  const location = useLocation();
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const title = PageTitles[location.pathname];
    setPageName(title);
  }, [location.pathname]);

  return (
    <div className="grid grid-cols-[240px_1fr] w-screen h-screen bg-cusgrey">
      <Sidebar />
      <section className="h-screen overflow-y-auto py-12 px-11.25 scrollbar-thin">
        <div className="flex flex-col gap-3.75">
          <div className="flex justify-between items-center">
            <h4 className="text-cusblack text-h4 font-bold">{pageName}</h4>
            <Profile />
          </div>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
