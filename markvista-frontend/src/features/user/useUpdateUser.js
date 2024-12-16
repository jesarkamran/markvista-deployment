import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../stores/user-context/useUser";
import { axiosProtected } from "../../utils/api";
import { toast } from "sonner";

async function update(updateUser) {
  console.log(updateUser);

  // if (updateUser.photo) {
  //   const res = await axiosProtected.post("/upload_file", updateUser.photo, {
  //     headers: {
  //       "Content-Type": updateUser?.photo?.type,
  //     },
  //   });

  //   console.log(res);
  // }

  // const resp = await axiosProtected.patch("/update-me", updateUser);
  // return resp;
  // Create FormData object
  const formData = new FormData();
  formData.append("name", updateUser.name);

  if (updateUser.photo) {
    formData.append("photo", updateUser.photo);
  }

  // Send the FormData object to the server
  for (var key of formData.entries()) {
    console.log(key[1]);
  }
  const resp = await axiosProtected.patch("/update-me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp;
}

function useUpdateUser(handleCancel) {
  const queryClient = useQueryClient();
  const { setUser } = useUser();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: update,
    onSuccess: ({ data }) => {
      handleCancel();

      queryClient.refetchQueries({
        queryKey: ["user"],
      });
      toast.success("User data Updated");
      console.log(data);

      setUser(data.data.user);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isUpdating, updateUser };
}

export default useUpdateUser;
