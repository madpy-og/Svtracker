import React, { useEffect, type ReactNode } from "react";
import { useState } from "react";
import Sidebar from "../ui/main/Sidebar";
import { Outlet, useLocation } from "react-router";
import Profile from "../ui/main/Profile";
import { userSchema, type UserSchema } from "../../schemas/userSchema";
import { getUserById } from "../../api/userApi";
import Navbar from "../ui/main/Navbar";
import Drawer from "../ui/main/Drawer";
import IncomeModal from "../ui/modal/IncomeModal";
import ExpenseModal from "../ui/modal/ExpenseModal";

const PageTitles: Record<string, string> = {
  "/": "Analytics",
  "/income": "Incomes",
  "/expense": "Expenses",
  "/setting": "Settings",
};

const DashboardLayout = () => {
  const [profile, setProfile] = useState<UserSchema | null>(null);
  const [pageName, setPageName] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const title = PageTitles[location.pathname];
    setPageName(title);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById();

      if (!data) {
        console.log("Something went wrong");
      }

      setProfile(data);
    };

    fetchUserData();
  }, []);

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

      <IncomeModal openModal={openModal} setOpenModal={setOpenModal} />
      <ExpenseModal openModal={openModal} setOpenModal={setOpenModal} />
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
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
