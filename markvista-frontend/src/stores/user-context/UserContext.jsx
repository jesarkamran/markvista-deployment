import { createContext, useEffect, useState } from "react";
import { useUserAuth } from "./useUserAuth";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadPage, setLoadPage] = useState(false);
  const [path, setPath] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { userData, isLoading, isError } = useUserAuth();
  useEffect(() => {
    if (!isLoading && !isError && userData && !isLoggedIn) {
      // console.log("Checking for user that logged in or not", userData);
      setUser(userData.data.data);
      setIsLoggedIn(true);
    }
  }, [userData, isLoading, isError, isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loadPage,
        setLoadPage,
        path,
        setPath,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
