import { Outlet } from "react-router-dom";
import { BiUser } from "react-icons/bi";

import Header from "./header/Header";
import Sidebar from "./Sidebar";
import ThemeToggle from "./header/sub-components/ThemeToggle";
import Logo from "./Logo";
import ButtonPopup from "../features/user/ButtonPopup";
import ProfileOverview from "../features/user/ProfileOverview";

function AppLayout() {
  return (
    <div className="h-screen overflow-hidden">
      <Header>
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <ThemeToggle />
          <ButtonPopup Logo={BiUser}>
            <ProfileOverview />
          </ButtonPopup>
        </div>
      </Header>

      <div className="grid grid-cols-[5rem_1fr] grid-rows-[auto_1fr] md:grid-cols-[13rem_1fr] md:grid-rows-[auto_1fr] lg:grid-cols-[16rem_1fr] lg:grid-rows-[auto_1fr]">
        <Sidebar />
        <main
          style={{ scrollbarWidth: "none" }}
          //   className="overflow-scroll bg-gray-100 p-16 dark:bg-gray-800"
          // >
          //   <div className="mx-auto flex h-screen max-w-[120rem] flex-col gap-8">
          className="col-span-1 h-[90vh] overflow-auto bg-gray-100 p-5 dark:bg-[var(--color-background)]"
        >
          <div className="mx-auto flex h-full max-w-[120rem] flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
