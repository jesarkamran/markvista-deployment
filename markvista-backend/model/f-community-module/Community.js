import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Community data must belong to a user"],
    },
    totalInteractions: {
      type: Number,
      default: 0,
    },
    achievements: [
      {
        name: {
          type: String,
          required: true,
        },
        earnedAt: {
          type: Date,
          default: Date.now,
        },
        description: String,
      },
    ],
    recentActivity: [
      {
        type: {
          type: String,
          enum: [
            "create_query",
            "query_answered",
            "answer_deleted",
            "answer_edited",
            "react_like",
            "react_dislike",
          ],
        },
        description: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    contributionLevel: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
    totalContributions: {
      type: Number,
      default: 0,
    },
    specialBadges: [
      {
        type: String,
      },
    ],
    skillTags: [
      {
        type: String,
      },
    ],
    communityRanking: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/// Middleware to automatically update contribution level
communitySchema.pre("save", function (next) {
  // Example contribution level calculation logic
  if (this.totalContributions < 10) {
    this.contributionLevel = 0;
  } else if (this.totalContributions < 50) {
    this.contributionLevel = 1;
  } else if (this.totalContributions < 200) {
    this.contributionLevel = 2;
  } else {
    this.contributionLevel = 3;
  }
  next();
});

communitySchema.statics.createOrUpdateCommunityData = async function (
  userId,
  updateData
) {
  try {
    const updateOperations = {
      $set: {
        user: userId,
        ...Object.fromEntries(
          Object.entries(updateData).filter(
            ([_, value]) =>
              !Array.isArray(value) &&
              !["totalInteractions", "totalContributions"].includes(_)
          )
        ),
      },
      $addToSet: {
        achievements: { $each: updateData.achievements || [] },
        recentActivity: { $each: updateData.recentActivity || [] },
        specialBadges: { $each: updateData.specialBadges || [] },
        skillTags: { $each: updateData.skillTags || [] },
      },
      $inc: {
        totalInteractions: updateData.totalInteractions || 0,
        totalContributions: updateData.totalContributions || 0,
      },
    };

    const communityData = await this.findOneAndUpdate(
      { user: userId },
      updateOperations,
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
    return communityData;
  } catch (error) {
    throw new Error(`Failed to create/update community data: ${error.message}`);
  }
};

// Optimized method to add an activity
communitySchema.methods.addActivitySafely = async function (
  activityType,
  description
) {
  try {
    return await this.constructor.findOneAndUpdate(
      { _id: this._id },
      {
        $push: {
          recentActivity: {
            $each: [
              {
                type: activityType,
                description,
                timestamp: new Date(),
              },
            ],
            $slice: -10, // Keep only the last 10 activities
          },
        },
        $inc: {
          totalInteractions: 1,
          totalContributions: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.error("Error adding activity:", error);
    throw error;
  }
};

// Optimized method to add an achievement
communitySchema.methods.addAchievementSafely = async function (
  name,
  description
) {
  return this.constructor.findOneAndUpdate(
    { _id: this._id },
    {
      $push: {
        achievements: {
          name,
          description,
          earnedAt: new Date(),
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

const CommunityData = mongoose.model("CommunityData", communitySchema);
export default CommunityData;
