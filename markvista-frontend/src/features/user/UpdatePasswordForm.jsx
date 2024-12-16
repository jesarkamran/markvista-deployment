import { useForm } from "react-hook-form";
import InputPassword from "../auth/InputPassword";
import useUpdatePassword from "./useUpdatePassword";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePassword();

  function onSubmit(updatedPassword) {
    updatePassword(updatedPassword, { onSuccess: reset() });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[var(--color-background)] dark:to-stone-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border border-gray-300 border-opacity-25 bg-white p-8 dark:bg-[var(--color-section)]"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Update Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please enter your current and new password.
          </p>
        </div>

        {/* Current Password */}
        <div className="relative mb-6">
          <InputPassword
            name="currentPassword"
            id="currentPassword"
            placeholder="Enter current password"
            disabled={isUpdating}
            register={register}
            error={errors?.currentPassword?.message}
            className="w-full rounded-lg border border-stone-300 p-3 shadow-sm focus:border-stone-500 focus:ring-2 focus:ring-stone-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
          />
        </div>

        {/* New Password */}
        <div className="relative mb-6">
          <InputPassword
            name="password"
            placeholder="choose new password"
            id="password"
            disabled={isUpdating}
            register={register}
            error={errors?.password?.message}
            className="w-full rounded-lg border border-stone-300 p-3 shadow-sm focus:border-stone-500 focus:ring-2 focus:ring-stone-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <InputPassword
            name="passwordConfirm"
            placeholder="confirm password"
            id="passwordConfirm"
            disabled={isUpdating}
            register={register}
            error={errors?.passwordConfirm?.message}
            validator={(value) =>
              getValues().password === value || "Passwords need to match"
            }
            className="w-full rounded-lg border border-stone-300 p-3 shadow-sm focus:border-stone-500 focus:ring-2 focus:ring-stone-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-2 text-gray-700 shadow-md hover:bg-gray-200 dark:border-gray-600 dark:bg-stone-700 dark:text-gray-300 dark:hover:bg-gray-600"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="ml-2 rounded-lg bg-gradient-to-r from-blue-700 to-sky-700 px-6 py-2 text-white shadow-md hover:opacity-90 disabled:opacity-50"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
