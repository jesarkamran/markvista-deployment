import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "../../stores/user-context/useUser";
import ImagePreview from "./ImagePreview";

export default function ProfileOverview() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Card className="to-gray-100rounded-lg w-72 overflow-hidden bg-gradient-to-br from-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border dark:border-gray-600 dark:from-[var(--color-background)] dark:to-stone-800">
      <CardHeader className="flex flex-col items-center justify-center space-y-4 pb-0">
        <ImagePreview
          photo={user.photo}
          addStyles="border-primary/20 h-24 w-24 transform rounded-full border-4 shadow-lg transition-transform hover:scale-110"
          alt={user.name[0].toUpperCase()}
        />

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 transition-colors dark:text-gray-200">
            {user?.name}
          </h3>
          <p className="text-sm text-gray-500 transition-colors dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        <Button
          onClick={() => navigate(`user-profile/${user?._id}`)}
          className="group relative flex w-full transform items-center justify-center overflow-hidden rounded-md border-none bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-500/90 hover:to-blue-600/90 hover:shadow-lg"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          <User className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          View Profile
        </Button>

        <Button
          onClick={() => navigate(`/app/update-user-profile/${user?._id}`)}
          className="group relative flex w-full transform items-center justify-center overflow-hidden rounded-md border-none bg-gradient-to-br from-purple-500/80 to-purple-600/80 text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-purple-500/90 hover:to-purple-600/90 hover:shadow-lg"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          <Edit className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
}
