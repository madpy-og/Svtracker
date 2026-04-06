import { NavLink } from "react-router";
import logo from "../../assets/images/svtracker-logo.png";
import { Menu } from "lucide-react";

type Props = {
  handleHamburger: () => void;
};

const Navbar = ({ handleHamburger }: Props) => {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center md:hidden justify-between h-12 px-4 bg-cuswhite shadow-md">
      <button
        onClick={handleHamburger}
        className="p-2 rounded-md hover:bg-cusgrey cursor-pointer"
      >
        <Menu strokeWidth={2} className="text-cusblack" />
      </button>
      <NavLink to="/" className="flex items-center gap-1.5 font-bold">
        <img src={logo} alt="logo" className="w-5 h-5" />
        <p className="text-bd text-cusblack">Svtracker</p>
      </NavLink>
    </nav>
  );
};

export default Navbar;
