import { createContext, useContext, useState, useEffect } from "react";
import persistedTheme from "./getTheme";

const ThemeContext = createContext({
  currentTheme: "light",
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(persistedTheme || "light");

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add("[&_*]:!transition-none");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 5);

    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeProvider = () => {
  const context = useContext(ThemeContext);
  return context;
};
