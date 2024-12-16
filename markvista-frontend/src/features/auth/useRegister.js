import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveToken } from "../../hooks/useJWTToken";
import { axiosAuth } from "../../utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

async function register(data) {
  const { data: responseData } = await axiosAuth.post(`/signup`, data);
  return responseData;
}

function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isRegistering, mutate: registerUser } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.setQueryData("user", data);
      toast.success("User Registered");
      console.log(data);

      saveToken(data?.data?.user?._id, data?.token);

      navigate("/app/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isRegistering, registerUser };
}

export default useRegister;
