function AuthButton({ onSubmit = () => {}, name, children, disable }) {
  return (
    <button
      disabled={disable}
      onClick={onSubmit}
      className="focus:shadow-outline mt-5 flex w-full items-center justify-center space-x-3 rounded-lg bg-blue-900 py-4 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none"
    >
      <span className="ml-3">{name}</span>
      {children}
    </button>
  );
}

export default AuthButton;
