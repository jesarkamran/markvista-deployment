import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";

import Input from "./Input";
import AuthSideLogo from "./AuthSideLogo";
import AuthButton from "./AuthButton";
import InputPassword from "./InputPassword";
import useRegister from "./useRegister";
import { User } from "lucide-react";
import { BsEnvelopeFill } from "react-icons/bs";

const Register = () => {
  return (
    <div className="flex items-center justify-center lg:px-0">
      <div className="flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:rounded-lg dark:bg-[var(--color-section)]">
        <AuthSideLogo />
        <div className="p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-blue-800 xl:text-4xl dark:text-white">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="mt-8 w-full flex-1">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

function RegisterForm() {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { isRegistering, registerUser } = useRegister();

  function onError(error) {
    console.log(error);
  }
  function onSubmit(data) {
    console.log(data);
    registerUser(data, {
      onSuccess: () => reset(),
    });
  }
  return (
    <form
      className="mx-auto flex max-w-xs flex-col gap-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Input
        placeholder="Enter your name"
        name="name"
        register={register}
        error={errors?.name?.message}
        disable={isRegistering}
        Icon={<User className="text-xl dark:text-blue-600" />}
      />
      <Input
        type="email"
        placeholder="Enter your email"
        name="email"
        register={register}
        error={errors?.email?.message}
        disable={isRegistering}
        Icon={<BsEnvelopeFill className="text-xl dark:text-blue-600" />}
      />
      <InputPassword
        name="password"
        placeholder={"Choose password"}
        register={register}
        error={errors?.password?.message}
        disable={isRegistering}
      />

      <InputPassword
        name="passwordConfirm"
        placeholder={"Confirm password"}
        register={register}
        validator={(value) =>
          value === getValues()?.password || "Passwords don't match"
        }
        error={errors?.passwordConfirm?.message}
        disable={isRegistering}
      />

      <AuthButton name="Sign Up" disable={isRegistering}>
        <FiUserPlus className="text-xl lg:text-2xl" />
      </AuthButton>
      <p className="mt-6 text-center text-xs text-gray-600">
        Already have an account?{" "}
        <Link to="/login">
          <span className="font-semibold text-blue-700 hover:text-blue-400 dark:text-white">
            Sign in
          </span>
        </Link>
      </p>
    </form>
  );
}
