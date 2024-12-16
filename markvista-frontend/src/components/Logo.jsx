import { Link } from "react-router-dom";
import logoIconLight from "../assets/images/logo-header-light.svg";
import logoIconDark from "../assets/images/logo-header-dark.svg";
import AppName from "./AppName";
import { useThemeProvider } from "../stores/theme-context/ThemeContext";
import useUser from "../stores/user-context/useUser";
function Logo({ size = "default" }) {
  const { currentTheme } = useThemeProvider();
  const { isLoggedIn } = useUser(); // Get login state
  const icon = currentTheme === "light" ? logoIconLight : logoIconDark;
  const style = {
    small: `mr-3 h-12 h-12 sm:h-14 sm:w-14 md:h-9 md:w-9`,
    default: "mr-3 h-10 w-10",
  };

  return (
    <Link to={isLoggedIn ? "/app/dashboard" : "/home"}>
      <div className="flex items-center">
        <img src={icon} className={style[size]} alt="Flowbite Logo" />
        <AppName size={size} />
      </div>
    </Link>
  );
}
export default Logo;
