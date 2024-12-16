import { useState } from "react";
import useUser from "../../stores/user-context/useUser";
import useUpdateUser from "./useUpdateUser";
import { ImageUpload } from "@components/ui/image-upload";

function UpdateUserDataForm() {
  const {
    user: { name: currentFullName, photo: currentPhoto },
    setUser,
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser(handleCancel);

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser({ name: fullName, photo: avatar });
  }

  function handleCancel() {
    setFullName(currentFullName);
    setUser((prev) => (prev.name = fullName));
    setAvatar(null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[var(--color-background)] dark:to-stone-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-300 border-opacity-25 bg-white p-8 dark:bg-[var(--color-section)]"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center">
            {currentPhoto ? (
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : `${import.meta.env.VITE_IMAGE_URL}${currentPhoto}`
                }
                alt="Avatar Preview"
                className="h-20 w-20 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500 shadow-md dark:bg-stone-700 dark:text-gray-300">
                No Image
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Update Profile
          </h2>
        </div>

        {/* Full Name Input */}
        <div className="relative mb-6">
          <label
            htmlFor="fullName"
            className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500 dark:bg-[var(--color-section)] dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-white"
          />
        </div>

        {/* Avatar Image Upload */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Avatar Image
          </label>
          <ImageUpload
            onFileSelect={(file) => setAvatar(file)}
            existingImage={null}
            className="w-full rounded-lg border border-dashed border-gray-300 p-4 text-center dark:border-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-2 text-gray-700 shadow-md hover:bg-gray-200 dark:border-stone-600 dark:bg-stone-700 dark:text-gray-300 dark:hover:bg-gray-600"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="ml-2 rounded-lg bg-gradient-to-r from-blue-700 to-sky-700 px-6 py-2 text-white shadow-md hover:opacity-90 disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
