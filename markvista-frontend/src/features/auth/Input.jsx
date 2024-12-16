import { className } from "./InputPassword";

const Input = ({
  placeholder,
  name,
  error,
  register = null,
  type = "text",
  disable,
  validator = () => {},
  Icon,
  themeStyle = "dark:bg-[var(--color-backgraound)]",
}) => {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          name={name}
          disabled={disable}
          className={`${className(error)} ${themeStyle}`}
          {...register(name, {
            required: "This Field is required",
            validate: validator,
          })}
          placeholder={placeholder}
          autoComplete="off"
        />

        <span className="absolute right-4 top-4">{Icon}</span>
      </div>
      {error && (
        <span className="mx-5 text-red-700 dark:text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
