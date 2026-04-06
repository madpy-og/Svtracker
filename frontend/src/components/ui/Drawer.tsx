import React from "react";
import {
  ChartColumnIncreasing,
  HandCoins,
  LogOut,
  PiggyBank,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../../api/authApi";
import logo from "../../assets/images/svtracker-logo.png";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Drawer = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <aside
      className={`flex flex-col fixed z-100 left-0 top-0 h-screen w-[240px] gap-12.5 rounded-[0px_15px_15px_0px] p-[32px_32px_285px_32px] bg-cuswhite shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <NavLink
        to="/"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-1.5 font-bold"
      >
        <img src={logo} alt="logo" className="w-7.25 h-7.25" />
        <p className="text-h6 text-cusblack">Svtracker</p>
      </NavLink>
      <div className="flex flex-col gap-5 ">
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <ChartColumnIncreasing strokeWidth={2.5} className="w-5 h-5 " />
          <p className="text-bd  font-semibold">Analytics</p>
        </NavLink>
        <NavLink
          to="/income"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <PiggyBank strokeWidth={2.5} className="w-5 h-5" />
          <p className="text-bd font-semibold">Incomes</p>
        </NavLink>
        <NavLink
          to="/expense"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <HandCoins strokeWidth={2.5} className="w-5 h-5" />
          <p className="text-bd font-semibold">Expenses</p>
        </NavLink>
        <NavLink
          //TEMPORARY
          to="/setting"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <Settings strokeWidth={2.5} className="w-5 h-5 " />
          <p className="text-bd font-semibold">Settings</p>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition text-danger hover:text-cuswhite hover:bg-danger cursor-pointer"
        >
          <LogOut strokeWidth={2.5} className="w-5 h-5" />
          <p className="text-bd font-semibold">Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Drawer;
