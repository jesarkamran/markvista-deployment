import ThemeToggle from "../components/header/sub-components/ThemeToggle";
import AuthBackButton from "../features/auth/AuthBackButton";
import Register from "../features/auth/Register";

function RegistrationPage() {
  return (
    <div className="flex h-[100vh] flex-col">
      <div className="mx-5 mt-1 flex justify-between">
        <AuthBackButton />
        <ThemeToggle />
      </div>
      <div className="max-w-9xl mx-auto w-full px-4 py-2 sm:px-2 lg:px-4">
        <Register />
      </div>
    </div>
  );
}

export default RegistrationPage;
