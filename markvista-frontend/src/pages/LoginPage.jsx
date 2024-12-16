import ThemeToggle from "../components/header/sub-components/ThemeToggle";
import AuthBackButton from "../features/auth/AuthBackButton";
import Login from "../features/auth/Login";

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col space-y-5 py-8">
      <div className="mx-5 mt-2 flex justify-between">
        <AuthBackButton />
        <ThemeToggle />
      </div>

      <main>
        <div className="max-w-9xl mx-auto w-full px-4 sm:px-2 lg:px-4">
          <Login />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
