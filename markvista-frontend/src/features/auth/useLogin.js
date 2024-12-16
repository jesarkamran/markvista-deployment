import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../stores/user-context/useUser";
import { axiosAuth } from "../../utils/api";
import { toast } from "sonner";

// Configure axios to include cookies with each request
// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;

async function login(data) {
  const { data: responseData } = await axiosAuth.post(`/login`, data);
  return responseData;
}

function useLogin() {
  const queryClient = useQueryClient();
  const { setIsLoggedIn, setUser } = useUser();
  const { isPending: isLogging, mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log(data);

      setIsLoggedIn(true);
      setUser(data.user);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isLogging, loginUser };
}

export default useLogin;
