import { Link } from "react-router-dom";

function LinkButton({ to }) {
  return (
    <Link to={to}>
      <h1
        className={`mx-5 rounded-lg bg-blue-700 px-2 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:px-4 md:text-[14px] lg:px-5 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        Get Started
      </h1>
    </Link>
  );
}

export default LinkButton;
