import React from "react";
import clsx from "clsx";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[var(--color-section)] dark:text-gray-50 dark:placeholder-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/40",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
