import { FaSpinner } from "react-icons/fa";

function Spinner({ name = "please wait...", type = "" }) {
  return (
    <div
      className={`flex ${type === "only" ? "" : "h-[100vh]"} items-center justify-center`}
    >
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
      <span className="ml-2">{name}</span>
    </div>
  );
}

export default Spinner;
