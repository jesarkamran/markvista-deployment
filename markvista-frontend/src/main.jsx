import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";
import ThemeProvider from "./stores/theme-context/ThemeContext";
import { UserProvider } from "./stores/user-context/UserContext.jsx";
import CryptoProvider from "./stores/crypto-context/CryptoContext.jsx";
import CommunityProvider from "./stores/community-context/CommunityContext.jsx";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <UserProvider>
            <CryptoProvider>
              <CommunityProvider>
                <App />
              </CommunityProvider>
            </CryptoProvider>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
