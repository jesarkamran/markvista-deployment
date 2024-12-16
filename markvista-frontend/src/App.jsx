import { Navigate, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import React, { useEffect, useState } from "react";
import useUser from "./stores/user-context/useUser";
import Spinner from "@components/Spinner";
import { ProtectedRoute, RoutePersistence } from "./routes/ProtectedRoutes";
import { Toaster } from "sonner";

import LandingPage from "@src/pages/LandingPage";
import LoginPage from "@src/pages/LoginPage";
import RegistrationPage from "@src/pages/RegistrationPage";

import AppLayout from "@components/AppLayout";
import Dashboard from "@src/pages/Dashboard";
import CryptoDetails from "@features/landing-page/CryptoDetails";
import CryptoList from "@features/landing-page/CryptoList";
import UserProfilePage from "@src/pages/UserProfilePage";
import Community from "@src/pages/Community";
import UpdateProfile from "@features/user/UpdateProfile";
import Trade from "@features/tradingpannel/pages/trade/trade";
import {
  Inputpart1,
  Inputpart2,
  Riskprofile,
  Description,
} from "@features/riskmanagement/pages";
import Portfoliooverview from "@features/user portfolio/pages/portfolio overview/portfoliooverview";
import APICONNECTION from "@features/tradingpannel/pages/connectapi/apiconnection";
import Setgoals from "@features/user portfolio/pages/set goals/setgoals";
import Main from "@features/riskmanagement/pages/visualizeandbreakdownpage/main";
import CryptoPriceModule from "./pages/Prediction";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center text-2xl text-red-500">
          Something went wrong. Please try again later.
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { loadPage, path, isLoggedIn } = useUser();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    console.log("Current Page:", path);
    setIsInitialLoad(false);
  }, [path]);

  // Initial loading state
  if (loadPage || isInitialLoad) {
    return (
      <ErrorBoundary>
        <div className="flex h-[100vh] items-center justify-center">
          <Spinner />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <>
      <RoutePersistence>
        <ErrorBoundary fallback={<Spinner />}>
          <Routes>
            {/* Protected App Routes */}
            {!isLoggedIn && (
              <>
                <Route
                  path="/"
                  element={
                    <AuthRedirect>
                      <LandingPage />
                    </AuthRedirect>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <AuthRedirect>
                      <LandingPage />
                    </AuthRedirect>
                  }
                />

                {/* Authentication Routes */}
                <Route
                  path="/login"
                  element={
                    <AuthRedirect>
                      <LoginPage />
                    </AuthRedirect>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthRedirect>
                      <RegistrationPage />
                    </AuthRedirect>
                  }
                />
              </>
            )}

            {isLoggedIn && (
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Dashboard and Main App Routes */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="portfolio" element={<Portfoliooverview />} />
                <Route path="predictions" element={<CryptoPriceModule />} />
                <Route path="apiconnection" element={<APICONNECTION />} />
                <Route path="setgoals" element={<Setgoals />} />
                <Route path="description/:id" element={<Description />} />

                {/* Input and Editing Routes */}
                <Route path="inputpart1" element={<Inputpart1 />} />
                <Route path="inputpart2" element={<Inputpart2 />} />
                <Route path="edit1/:id" element={<Inputpart1 />} />
                <Route path="edit2/:id" element={<Inputpart2 />} />

                {/* Profile Routes */}
                <Route path="risk-profile" element={<Riskprofile />} />
                <Route
                  path="update-user-profile/:id"
                  element={<UpdateProfile />}
                />
                <Route path="user-profile/:id" element={<UserProfilePage />} />

                {/* Trading and Advanced Routes */}
                <Route path="trading-panel" element={<Trade />} />
                <Route path="main" element={<Main />} />
                <Route path="main/:id" element={<Main />} />

                {/* Nested Routes */}
                <Route path="community/*" element={<Community />} />
                <Route path="crypto" element={<CryptoList />}>
                  <Route path=":coinId" element={<CryptoDetails />} />
                </Route>
              </Route>
            )}
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </RoutePersistence>
      <Toaster
        position="top-center"
        richColors
        closeButton
        gutter={12}
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
            duration: 3000,
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
            duration: 5000,
          },
          style: {
            background: "bg-gray-100",
            color: "text-gray-700",
            padding: "12px",
          },
        }}
      />
    </>
  );
}

export const AuthRedirect = ({ children }) => {
  const { isLoggedIn } = useUser(); // Replace with your actual auth hook

  if (isLoggedIn) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
};

const NotFoundPage = () => {
  const { isLoggedIn } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-4">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Navigate to={isLoggedIn ? "/app/dashboard" : "/"} replace />
    </div>
  );
};

export default App;
