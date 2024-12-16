import React from "react";
import { ReactNode } from "react";

interface InputProps {
  label: string;
  Icon: ReactNode;
  type: string;
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({
  label,
  Icon,
  type,
  value,
  setValue,
  placeholder,
}: InputProps) => {
  return (
    <>
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="border-stroke focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:text-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />

        <span className="absolute right-4 top-4">{Icon}</span>
      </div>
    </>
  );
};
Input.displayName = "Input";
