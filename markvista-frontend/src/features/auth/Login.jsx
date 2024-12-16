import { Link, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import Input from "./Input";
import AuthSideLogo from "./AuthSideLogo";
import AuthButton from "./AuthButton";
import InputPassword from "./InputPassword";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import { toast } from "sonner";
import Spinner from "@components/Spinner";
import { useState } from "react";
import { BsEnvelopeFill } from "react-icons/bs";

const Login = () => {
  return (
    <div className="flex items-center justify-center px-5 lg:px-0">
      <div className="flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:rounded-lg dark:bg-[var(--color-section)]">
        <AuthSideLogo />
        <div className="p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-blue-800 xl:text-4xl dark:text-white">
                Login
              </h1>
              <p className="text-[12px] text-gray-500 dark:text-gray-300">
                Hey enter your details to Login to your account
              </p>
            </div>
            <div className="mt-8 w-full flex-1">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

function LoginForm() {
  const navigate = useNavigate();
  const { isLogging, loginUser } = useLogin();
  const [startLoading, setStartLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onError(error) {
    setStartLoading(false);
    console.log(error);
  }
  function onSubmit(data) {
    console.log("Login in Progress");
    setStartLoading(true);
    setTimeout(() => {
      loginUser(data, {
        onSuccess: () => {
          reset();
          setStartLoading(false);
          toast.success("login successfull");
          navigate(`/app/dashboard`);
        },
      });
    }, 1000);
  }

  if (isLogging || startLoading) return;
  <div className="h-full">
    <Spinner type="only" />;
  </div>;

  return (
    <form
      className="mx-auto flex max-w-xs flex-col gap-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Input
        name="email"
        Icon={<BsEnvelopeFill className="text-xl dark:text-white" />}
        type="email"
        placeholder="Enter your email"
        register={register}
        disable={isLogging}
        error={errors?.email?.message}
      />
      <InputPassword
        name="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors?.password?.message}
        disable={isLogging}
      />
      <AuthButton name="Login" disable={isLogging}>
        <LuLogIn className="text-2xl" />
      </AuthButton>
      <p className="mt-6 text-center text-xs text-gray-600 dark:text-white">
        Don&apos;t have an account?{" "}
        <Link to="/register">
          <span className="font-semibold text-blue-900 hover:text-gray-400 dark:text-blue-500">
            register here
          </span>
        </Link>
      </p>
    </form>
  );
}
