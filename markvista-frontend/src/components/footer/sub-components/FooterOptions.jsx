import { Link } from "react-router-dom";

function FooterOptions() {
  return (
    <div className="flex justify-around space-x-32 text-gray-800 dark:text-white">
      <div className="flex flex-col space-y-3">
        <Link to="#home" className="hover:text-gray-500">
          Home
        </Link>
        <Link to="#services" className="hover:text-gray-500">
          About
        </Link>
      </div>
      <div className="flex flex-col space-y-3">
        <Link to="#" className="hover:text-gray-500">
          Community
        </Link>
        <Link to="#" className="hover:text-gray-500">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default FooterOptions;
