import { Types } from "mongoose";
import RiskProfile from "../../model/b-risk-module/riskprofilemodal.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

// Get all risk profiles
export const getAllRiskProfiles = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Extract user ID from the req.user object

  const riskProfiles = await RiskProfile.find({ user: userId });

  if (!riskProfiles || riskProfiles.length === 0) {
    return next(new AppError("No risk profiles found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    data: riskProfiles,
  });
});

// Get a single risk profile
export const getSingleRiskProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; // Extract the user's ID from the request object

  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const riskProfile = await RiskProfile.findOne({ _id: id, user: userId });

  if (!riskProfile) {
    return next(
      new AppError("Risk profile not found or does not belong to the user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: riskProfile,
  });
});

// Create a new risk profile

export const createRiskProfile = catchAsync(async (req, res, next) => {
  // Helper function to sanitize values, setting defaults if undefined or empty
  const sanitize = (value, defaultValue) => {
    return value === "" || value === undefined ? defaultValue : value;
  };

  const {
    title,
    description,
    SLallowedperday,
    initialRiskPerTrade,
    increaseOnWin,
    decreaseOnLoss,
    maxRisk,
    minRisk,
    reset,
    growthThreshold,
    payoutPercentage,
    minRiskRewardRatio,
    isDefault,
  } = req.body;

  const userId = req.user._id; // Extract the authenticated user's ID

  // Fetch existing profiles for the user to check if there are any profiles
  const existingProfiles = await RiskProfile.find({ user: userId });

  const isFirstProfile = existingProfiles.length === 0;

  // If this is the first profile, automatically set it as default
  const profileData = {
    user: userId,
    title,
    description,
    SLallowedperday: sanitize(SLallowedperday, 100),
    initialRiskPerTrade: sanitize(initialRiskPerTrade, 0),
    increaseOnWin: sanitize(increaseOnWin, 0),
    decreaseOnLoss: sanitize(decreaseOnLoss, 0),
    maxRisk: sanitize(maxRisk, 100),
    minRisk: sanitize(minRisk, 0),
    reset: sanitize(reset, 100000),
    growthThreshold: sanitize(growthThreshold, 0),
    payoutPercentage: sanitize(payoutPercentage, 0),
    minRiskRewardRatio: sanitize(minRiskRewardRatio, 1),
    default: isFirstProfile || isDefault, // Automatically set first profile as default
    ison: isFirstProfile || isDefault, // Automatically set first profile as active
  };

  // If this is not the first profile and the 'isDefault' flag is set, ensure only one profile is default
  if (isDefault && !isFirstProfile) {
    await RiskProfile.updateMany({ user: userId }, { default: false });
  }

  // Create the new risk profile
  const newRiskProfile = await RiskProfile.create(profileData);

  res.status(201).json({
    status: "success",
    message: "New risk profile created",
    data: newRiskProfile,
  });
});

// Delete a risk profile
export const deleteRiskProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; // Extract the user's ID from the request object

  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const riskProfile = await RiskProfile.findOne({ _id: id, user: userId });

  if (!riskProfile) {
    return next(new AppError("Risk profile not found", 404));
  }

  // Prevent deletion of the default profile
  if (riskProfile.default) {
    return next(new AppError("Cannot delete the default risk profile", 400));
  }

  // If the profile to be deleted is active (`ison: true`)
  if (riskProfile.ison) {
    // Find the default risk profile for this user
    const defaultProfile = await RiskProfile.findOne({
      user: userId,
      default: true,
    });

    if (defaultProfile) {
      // Deactivate all active profiles for the user
      await RiskProfile.updateMany(
        { user: userId, ison: true },
        { ison: false }
      );

      // Set the default profile as active
      defaultProfile.ison = true;
      await defaultProfile.save();
    }
  }

  // Proceed to delete the risk profile
  const deletedRiskProfile = await RiskProfile.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Risk profile deleted successfully",
    data: deletedRiskProfile,
  });
});

// Update a risk profile
export const updateRiskProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; // Extract the user's ID from the request object

  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const updates = req.body;

  // Ensure the profile belongs to the authenticated user
  const updatedRiskProfile = await RiskProfile.findOneAndUpdate(
    { _id: id, user: userId },
    updates,
    { new: true }
  );

  if (!updatedRiskProfile) {
    return next(
      new AppError("Risk profile not found or does not belong to the user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Risk profile updated successfully",
    data: updatedRiskProfile,
  });
});

// Get active risk profiles
export const getActiveRiskProfile = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Extract the user's ID from the request object

  // Fetch the active risk profile for the logged-in user
  const activeRiskProfile = await RiskProfile.findOne({
    user: userId,
    ison: true,
  });

  if (!activeRiskProfile) {
    return next(
      new AppError("No active risk profile found for this user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: activeRiskProfile,
  });
});

// Activate/deactivate a risk profile
export const activateprofile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; // Extract the user's ID from the request object

  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const { ison } = req.body;

  // Ensure `ison` is a boolean and reject attempts to set `ison: false`
  if (ison !== true) {
    return next(
      new AppError(
        "You can only activate a risk profile. Deactivation is not allowed directly.",
        400
      )
    );
  }

  // Deactivate all other profiles for the user
  await RiskProfile.updateMany({ user: userId, ison: true }, { ison: false });

  // Activate the selected profile and reset specific fields
  const updatedRiskProfile = await RiskProfile.findOneAndUpdate(
    { _id: id, user: userId },
    {
      ison: true,
      previousrisk: 0,
      currentrisk: 0,
      consecutiveWins: 0,
      consecutiveLosses: 0,
      goals: [], // Clear goals array
    },
    { new: true }
  );

  if (!updatedRiskProfile) {
    return next(
      new AppError("Risk profile not found or does not belong to the user", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Risk profile activated successfully",
    data: updatedRiskProfile,
  });
});

// Ensure that there is always one default profile
export const resetdefault = catchAsync(async (req, res, next) => {
  const { id } = req.body; // The ID of the profile to be set as default
  const userId = req.user._id; // Extract the user's ID from the request object

  // Validate the incoming ID
  if (!id) {
    return next(new AppError("Profile ID is required.", 400));
  }

  // Check if the specified profile belongs to the user
  const profile = await RiskProfile.findOne({ _id: id, user: userId });
  if (!profile) {
    return next(
      new AppError("Profile not found or does not belong to the user.", 404)
    );
  }

  // Ensure only one profile is set as default for the user
  await RiskProfile.updateMany({ user: userId }, { default: false });

  // Set the selected profile as the default
  const updatedProfile = await RiskProfile.findByIdAndUpdate(
    id,
    { default: true },
    { new: true }
  );

  if (!updatedProfile) {
    return next(new AppError("Failed to update the default profile.", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Default risk profile updated successfully.",
    data: updatedProfile,
  });
});
