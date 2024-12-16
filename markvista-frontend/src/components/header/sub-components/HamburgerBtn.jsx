const HamburgerBtn = ({ sidebarOpen, handler }) => {
  return (
    <div className="flex">
      {/* Hamburger button */}
      <button
        className="text-slate-500 hover:text-slate-600 lg:hidden"
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        onClick={(e) => {
          e.stopPropagation();
          handler(!sidebarOpen);
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="5" width="16" height="2" />
          <rect x="4" y="11" width="16" height="2" />
          <rect x="4" y="17" width="16" height="2" />
        </svg>
      </button>
    </div>
  );
};

export default HamburgerBtn;
