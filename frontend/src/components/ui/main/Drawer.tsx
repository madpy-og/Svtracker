import React from "react";
import {
  ChartColumnIncreasing,
  HandCoins,
  LogOut,
  PiggyBank,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../../../api/authApi";
import Profile from "./Profile";
import type { UserSchema } from "../../../schemas/userSchema";

type Props = {
  user: UserSchema | null;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const Drawer = ({ user, openDrawer, setOpenDrawer }: Props) => {
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
      className={`flex md:hidden flex-col fixed z-95 left-0 top-0 h-screen w-[240px] gap-5 rounded-[0px_15px_15px_0px] p-[32px_32px_285px_32px] bg-cuswhite shadow-md transform transition-transform duration-300 ease-in-out
        ${openDrawer ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Profile user={user} variant="vertical" />
      <div className="flex flex-col gap-5 ">
        <NavLink
          to="/"
          onClick={() => setOpenDrawer(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <ChartColumnIncreasing strokeWidth={2.5} className="w-4 h-4 " />
          <p className="text-bd-m font-semibold">Analytics</p>
        </NavLink>
        <NavLink
          to="/income"
          onClick={() => setOpenDrawer(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <PiggyBank strokeWidth={2.5} className="w-4 h-4" />
          <p className="text-bd-m font-semibold">Incomes</p>
        </NavLink>
        <NavLink
          to="/expense"
          onClick={() => setOpenDrawer(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <HandCoins strokeWidth={2.5} className="w-4 h-4" />
          <p className="text-bd-m font-semibold">Expenses</p>
        </NavLink>
        <NavLink
          //TEMPORARY
          to="/setting"
          onClick={() => setOpenDrawer(false)}
          className={({ isActive }) =>
            `flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition
   ${isActive ? "text-cuswhite bg-cusorange" : "text-cusblack hover:text-cuswhite hover:bg-cusorange"}`
          }
        >
          <Settings strokeWidth={2.5} className="w-4 h-4 " />
          <p className="text-bd-m font-semibold">Settings</p>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 w-full rounded-lg px-2.5 py-1.25 transition text-danger hover:text-cuswhite hover:bg-danger cursor-pointer"
        >
          <LogOut strokeWidth={2.5} className="w-4 h-4" />
          <p className="text-bd-m font-semibold">Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Drawer;
