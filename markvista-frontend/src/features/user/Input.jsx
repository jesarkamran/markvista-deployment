function Input({ type, name, value, onChange, disable }) {
  if (type === "text")
    return (
      <input
        className="w-full rounded-lg border-blue-400 bg-gray-100 focus:ring-0 dark:text-gray-600"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disable}
      />
    );

  return (
    <div className="flex w-max justify-center gap-1">
      <label
        htmlFor="fileInput"
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Choose File
      </label>
      <input
        className="hidden"
        type={type}
        id="fileInput"
        name={name}
        onChange={onChange}
        disabled={disable}
      />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
        {value ? value.name : "No file chosen"}
      </p>
    </div>
  );
}

export default Input;
