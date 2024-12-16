import CommunityData from "../../model/f-community-module/Community.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

export const getUserCommunityProfile = catchAsync(async (req, res, next) => {
  // Get user ID - could be from authenticated user or from params
  const userId = req.user.id;

  // Find community data and populate user details
  const communityData = await CommunityData.findOne({ user: userId }).populate({
    path: "user",
    select: "name email photo joinDate",
  });

  if (!communityData) {
    return next(new AppError("No community data found for this user", 404));
  }

  // Transform data to match our React component's expected structure
  const userCommunityProfile = {
    username: communityData.user.name,
    email: communityData.user.email,
    photo: communityData.user.photo,
    communityStats: {
      totalInteractions: communityData.totalInteractions,
      communityRanking: communityData.communityRanking,
    },
    achievements: communityData.achievements,
    recentActivity: communityData.recentActivity.map((activity) => ({
      description: activity.description,
      type: activity.type,
      timestamp: activity.timestamp,
    })),
    contributionLevel: communityData.contributionLevel,
    joinDate: communityData.user.joinDate || new Date(), // Fallback to current date
    totalContributions: communityData.totalContributions,
    specialBadges: communityData.specialBadges,
    skillTags: communityData.skillTags,
  };

  userCommunityProfile.recentActivity =
    userCommunityProfile.recentActivity.reverse();

  res.status(200).json({
    status: "success",
    data: userCommunityProfile,
  });
});

export const updateCommunityActivity = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { activityType, description } = req.body;

    const communityData = await CommunityData.createOrUpdateCommunityData(
      userId,
      {
        recentActivity: [
          {
            type: activityType,
            description,
            timestamp: new Date(),
          },
        ],
        totalInteractions: 1,
        totalContributions: 1,
      }
    );

    res.status(200).json({
      message: "Activity tracked successfully",
      data: communityData,
    });
  } catch (error) {
    console.error("Error tracking activity:", error);
    res.status(500).json({
      message: "Failed to track activity",
      error: error.message,
    });
  }
};

export const addAchievement = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { name, description } = req.body;

  // Find or create community data
  let communityData = await CommunityData.findOne({ user: userId });

  if (!communityData) {
    communityData = new CommunityData({
      user: userId,
      totalContributions: 0,
      totalInteractions: 0,
    });
  }

  // Add new achievement
  await communityData.addAchievement(name, description);

  res.status(200).json({
    status: "success",
    message: "Achievement added",
    data: communityData,
  });
});

export const addSpecialBadge = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { badge } = req.body;

  // Find or create community data
  let communityData = await CommunityData.findOne({ user: userId });

  if (!communityData) {
    communityData = new CommunityData({
      user: userId,
      totalContributions: 0,
      totalInteractions: 0,
    });
  }

  // Add badge if not already present
  if (!communityData.specialBadges.includes(badge)) {
    communityData.specialBadges.push(badge);
    await communityData.save();
  }

  res.status(200).json({
    status: "success",
    message: "Special badge added",
    data: communityData,
  });
});
