function Button({
  type,
  children,
  onClick = () => {},
  style = "",
  key = "",
  color = "blue-500",
  colorDark = "blue-600",
}) {
  let base = "flex cursor-pointer items-center gap-10 justify-center";

  if (type === "round")
    base = `${base} h-9 w-9 rounded-full text-[18px] text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600`;

  if (type === "secondary" || type === "large")
    base = `${base} h-9 w-max p-3 rounded-md text-md font-semibold`;

  if (type === "secondary")
    base = `${base} bg-${color} dark:bg-${colorDark}  hover:opacity-75`;

  if (type === "large")
    base = `${base} bg-blue-500 text-gray-100 dark:bg-blue-700  hover:bg-blue-400 dark:hover:bg-blue-500`;

  return (
    <button
      onClick={onClick}
      className={`${base} ${style} ${!type ? "" : "border border-gray-600 border-opacity-25 dark:border-gray-100 dark:border-opacity-25"}`}
      key={key}
    >
      {children}
    </button>
  );
}

export default Button;
