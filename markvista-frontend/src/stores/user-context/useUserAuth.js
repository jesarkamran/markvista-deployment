// hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import { axiosProtected } from "../../utils/api";

export const getUser = async () => {
  const { data } = await axiosProtected.get("/me");
  return data;
};

export const useUserAuth = () => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    // onError: (err) => {
    //   console.error("Error fetching user data:", err);
    // },
  });

  return {
    userData,
    isLoading,
    isError,
    error,
  };
};
