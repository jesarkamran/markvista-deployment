import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUserDataForm from "./UpdateUserDataForm";

function UpdateProfile() {
  return (
    <div className="rounded-xl border border-gray-400 border-opacity-25 bg-gradient-to-br from-white to-gray-100 p-6 text-gray-700 shadow-2xl dark:from-[var(--color-background)] dark:to-stone-700 dark:text-gray-50">
      {/* Main Heading */}
      <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-wider text-transparent">
        Update Your Account
      </h1>

      {/* Tabs */}
      <Tabs defaultValue="personal-info" className="mt-4">
        <TabsList className="flex justify-center space-x-4 rounded-lg bg-gray-200 p-2 shadow-md dark:bg-[var(--color-card)]">
          <TabsTrigger
            value="personal-info"
            className="px-6 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-900 dark:hover:text-blue-400"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="px-4 py-2 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-purple-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-purple-900 dark:hover:text-purple-400"
          >
            Password
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="personal-info">
          <div className="rounded-lg bg-white shadow-md dark:bg-[var(--color-card)]">
            <UpdateUserDataForm />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="rounded-lg bg-white shadow-md dark:bg-[var(--color-card)]">
            <UpdatePasswordForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UpdateProfile;
