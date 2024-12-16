import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

const InputPassword = ({
  placeholder = "",
  name,
  register,
  error,
  validator = (value) =>
    value.length >= 8 || "password should be more than 8 characters",
  disable,
  themeStyle = "dark:bg-[var(--color-backgraound)]",
}) => {
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div>
      <div className="relative">
        <input
          className={`${className(error)} ${themeStyle}`}
          name={name}
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: "This Field is required",
            validate: validator,
          })}
          disabled={disable}
          autoComplete="off"
        />

        <span
          className="absolute right-4 top-4 cursor-pointer text-xl text-blue-500"
          onClick={handleToggle}
        >
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </span>
      </div>
      {error && (
        <span className="mx-5 text-red-700 dark:text-[#FF4136]">{error}</span>
      )}
    </div>
  );
};

export default InputPassword;

// eslint-disable-next-line react-refresh/only-export-components
export const className = (error) =>
  `w-full rounded-lg border bg-gray-100 py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:text-white 
   ${error ? "border-red-600 focus:ring-red-600" : "border-gray-400 dark:border-[var(--color-background)]"}
   /* Autofill styles */
   focus:outline-none autofill:bg-blue-100 dark:autofill:bg-[var(--color-background)]`;

// export const className = (error) =>
//   `w-full rounded-lg border bg-gray-100 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:bg-[var(--color-background)] dark:text-white ${error ? "border-red-600 focus:ring-red-600" : "border-gray-400 dark:border-[var(--color-background)]"} `;
