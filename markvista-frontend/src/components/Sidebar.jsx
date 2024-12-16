import SideNav from "./SideNav";
import Logout from "../features/auth/Logout";
import AppName from "./AppName";

function Sidebar() {
  return (
    // <aside className="row-span-full flex h-screen flex-col justify-between gap-4 border-r border-gray-100 bg-white px-3 py-2 md:px-2 md:py-4 md:text-lg lg:px-6 lg:py-8 dark:border-gray-700 dark:bg-gray-800">
    <aside className="row-span-full flex h-[90vh] flex-col justify-between gap-4 border-r border-gray-100 bg-white px-3 py-2 md:px-2 md:py-4 md:text-lg lg:px-6 lg:py-8 dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
      <div style={{ scrollbarWidth: "none" }} className="overflow-auto">
        <SideNav />
      </div>

      <footer>
        <Logout />

        <span className="hidden pt-2 text-xs md:flex">
          <em>
            &copy; all rights reserved by <AppName size="xs" />
          </em>
        </span>
      </footer>
    </aside>
  );
}

export default Sidebar;
