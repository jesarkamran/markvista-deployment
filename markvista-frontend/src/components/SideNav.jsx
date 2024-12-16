import { NavLink } from "react-router-dom";

import { HiOutlineHome } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { RiComputerLine } from "react-icons/ri";
import { FaBriefcase } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TrendingUp } from "lucide-react";

function SideNav() {
  return (
    <nav className="my-10 md:my-20">
      <ul className="flex flex-col gap-2">
        <SideNavItem
          to="/app/dashboard"
          Icon={HiOutlineHome}
          name="Home"
          active="active"
        />

        <SideNavItem
          to="/app/risk-profile"
          Icon={ImProfile}
          name="Risk Profiles"
        />

        <SideNavItem to="/app/portfolio" Icon={FaBriefcase} name="Portfolio" />
        <SideNavItem
          to="/app/predictions"
          Icon={TrendingUp}
          name="Predictions"
        />

        <SideNavItem
          to="/app/trading-panel"
          Icon={RiComputerLine}
          name="Trading Panel"
        />

        <SideNavItem to="/app/community" Icon={MdGroups} name="Community" />
      </ul>
    </nav>
  );
}

export default SideNav;

function SideNavItem({ to = "", Icon, name }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex w-min items-center gap-3 rounded-full p-3 font-medium text-gray-600 transition-all duration-100 hover:rounded-md md:w-auto md:rounded-md md:px-6 md:py-3 md:text-[16px] dark:text-gray-200 ${
            isActive
              ? "bg-blue-500 text-gray-800 dark:bg-blue-600"
              : "hover:bg-blue-400 hover:text-gray-200 dark:hover:bg-blue-500"
          }`
        }
      >
        <Icon className="h-7 w-7 transition-all duration-100 sm:h-8 sm:w-8 md:h-6 md:w-6" />
        <span className="hidden md:block">{name}</span>
      </NavLink>
    </li>
  );
}
