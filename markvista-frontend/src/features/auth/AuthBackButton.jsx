import useMoveBack from "../../hooks/useMoveBack";
function AuthBackButton() {
  const moveBack = useMoveBack();
  return (
    <button
      onClick={moveBack}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white pb-1 text-2xl font-extrabold hover:bg-slate-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600/80"
    >
      <span>&#8592;</span>
    </button>
  );
}

export default AuthBackButton;
