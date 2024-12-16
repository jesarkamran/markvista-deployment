const Header = ({ children }) => {
  return (
    <header className="top-0 flex justify-between border-b border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
      {children}
    </header>
  );
};

export default Header;
