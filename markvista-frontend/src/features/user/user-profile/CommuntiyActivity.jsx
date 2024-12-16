import Spinner from "@components/Spinner";
import { fetchUserCommunityProfile } from "@features/community/asynchronous-code/activityTrack";
import useUser from "@src/stores/user-context/useUser";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Trophy,
  Star,
  Activity,
  Medal,
  Clock,
  Check,
  Heart,
  ArrowUpRight,
} from "lucide-react";

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Calculate contribution level color and description
const getContributionLevelInfo = (contributionLevel) => {
  const levels = [
    {
      level: 0,
      color: "bg-gray-600 dark:bg-gray-700",
      description: "Newcomer",
    },
    { level: 1, color: "bg-green-400", description: "Active Contributor" },
    { level: 2, color: "bg-blue-500", description: "Community Leader" },
    { level: 3, color: "bg-purple-600", description: "Community Champion" },
  ];
  return levels[Math.min(contributionLevel, levels.length - 1)];
};

const CommunityActivity = () => {
  const { user } = useUser();

  const { isLoading, data: userData } = useQuery({
    queryKey: ["community-profile", user?._id],
    queryFn: async () => {
      if (!user?._id) throw new Error("User ID is required");
      return fetchUserCommunityProfile(user._id);
    },
    enabled: !!user?._id,
  });

  if (isLoading)
    return (
      <div className="mx-auto w-full rounded-2xl bg-white p-6 shadow-lg dark:bg-[var(--color-background)]">
        <Spinner />
      </div>
    );

  if (!userData)
    return (
      <div className="mx-auto w-full rounded-2xl bg-white p-6 shadow-lg dark:bg-[var(--color-background)]">
        No community data available
      </div>
    );
  // Safely destructure with default values
  const {
    communityStats = { totalInteractions: 0 },
    contributionLevel = 0,
    joinDate,
    achievements,
    specialBadges,
    totalContributions,
    recentActivity,
    // Add other fields with default values
  } = userData || {};

  const contributionLevelInfo = getContributionLevelInfo(contributionLevel);

  return (
    <div className="mx-auto w-full rounded-2xl border border-gray-400 border-opacity-50 bg-white p-6 shadow-lg dark:border-opacity-25 dark:bg-[var(--color-background)]">
      {/* Header Section */}
      <div className="mb-6 flex items-center">
        <div>
          <div
            className={`inline-flex items-center ${contributionLevelInfo.color} mt-2 rounded-full px-3 py-1 text-sm text-white`}
          >
            <Star className="mr-2 h-4 w-4" />
            {contributionLevelInfo.description}
          </div>
        </div>
      </div>

      {/* Community Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-500" />}
          label="Total Interactions"
          value={formatNumber(communityStats.totalInteractions || 0)}
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-yellow-500" />}
          label="Achievements"
          value={formatNumber(achievements.length)}
        />
        <StatCard
          icon={<Medal className="h-6 w-6 text-green-500" />}
          label="Contributions"
          value={formatNumber(totalContributions)}
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-purple-500" />}
          label="Community Age"
          value={`${Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24))} days`}
        />
      </div>

      {/* Achievements Section */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-[var(--color-section)]">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
          <Star className="mr-2 text-yellow-500" /> Special Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          {specialBadges.slice(0, 5).map((badge, index) => (
            <div
              key={index}
              className="flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm dark:bg-[var(--color-section)]"
            >
              <Check className="mr-2 h-4 w-4 text-green-500" />
              {badge}
            </div>
          ))}
          {specialBadges.length > 5 && (
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-[var(--color-section)]">
              +{specialBadges.length - 5} more
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
          <Activity className="mr-2 text-blue-500" /> Recent Community Activity
        </h3>
        <div className="space-y-2">
          {recentActivity.slice(0, 3).map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-[var(--color-section)]"
            >
              <div className="flex items-center">
                <Heart className="mr-3 h-5 w-5 text-red-400" />
                <span className="text-gray-700 dark:text-gray-200">
                  {activity.description}
                </span>
              </div>
              <ArrowUpRight className="text-gray-400 dark:text-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="rounded-lg border border-gray-300 border-opacity-40 bg-gray-50 p-4 text-center transition hover:shadow-md dark:bg-[var(--color-section)]">
    <div className="mb-2 flex justify-center">{icon}</div>
    <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
      {value}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
  </div>
);

export default CommunityActivity;
