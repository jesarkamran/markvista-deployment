import { FiLogOut } from "react-icons/fi";
import useUser from "../../stores/user-context/useUser";
import { axiosProtected } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function Logout() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setIsLoggedIn, setLoadPage } = useUser();

  async function logout() {
    console.log("Logging Out");
    setLoadPage(true);

    try {
      await axiosProtected.post("/logout");
      setIsLoggedIn(false);
      setUser(null);
      // Reset application state
      queryClient.clear();

      // Optional: Force full page reload
      window.location.href = "/home";
    } catch (error) {
      toast.error("Logout failed: " + error?.response?.data?.message);
      console.error("Logout failed:", error);
      setLoadPage(false);
    }
  }

  return (
    <div
      className="flex w-min cursor-pointer items-center gap-3 rounded-full bg-gray-300 p-3 font-medium text-gray-600 transition-all duration-100 hover:rounded-md hover:bg-gray-200 md:w-auto md:rounded-md md:px-8 md:py-3 md:text-[16px] dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
      onClick={logout}
      role="button"
      aria-label="Logout"
    >
      <FiLogOut className="h-6 w-6 transition-all duration-100 sm:h-7 sm:w-7 md:h-6 md:w-6 md:text-[22px]" />
      <span className="hidden md:block">Logout</span>
    </div>
  );
}

export default Logout;
