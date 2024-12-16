import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosProtected } from "../../utils/api";
import { toast } from "sonner";

async function update(updatePassword) {
  const resp = await axiosProtected.patch(
    "/update-my-password",
    updatePassword,
  );
  return resp;
}

function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Password Updated");
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isUpdating, updatePassword };
}

export default useUpdatePassword;
