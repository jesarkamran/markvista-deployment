import useUser from "@src/stores/user-context/useUser";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const RoutePersistence = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPath } = useUser();
  useEffect(() => {
    // Save current route to localStorage with additional context
    const routeInfo = {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      timestamp: Date.now(),
    };

    // Exclude certain routes from being saved
    const excludedRoutes = ["/home", "/login", "/register"];

    if (!excludedRoutes.includes(location.pathname)) {
      localStorage.setItem("lastRoute", JSON.stringify(routeInfo));
      setPath(routeInfo.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    // Check for saved route on initial load
    const savedRouteJson = localStorage.getItem("lastRoute");

    // Check if we're on a landing/entry point
    const isLandingPage =
      window.location.pathname === "/" || window.location.pathname === "/home";

    if (isLandingPage && savedRouteJson) {
      try {
        const savedRoute = JSON.parse(savedRouteJson);

        // Optional: Add a timestamp check to invalidate old routes (e.g., after 24 hours)
        const currentTime = Date.now();
        const routeAge = currentTime - savedRoute.timestamp;
        const MAX_ROUTE_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (routeAge < MAX_ROUTE_AGE) {
          // Construct full path with search and hash
          const fullPath =
            savedRoute.pathname +
            (savedRoute.search || "") +
            (savedRoute.hash || "");

          navigate(fullPath, { replace: true });
        }
      } catch (error) {
        console.error("Error parsing saved route:", error);
        // Clear invalid localStorage entry
        localStorage.removeItem("lastRoute");
      }
    }
  }, [navigate]);

  return children;
};

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser(); // Replace with your actual auth hook
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
