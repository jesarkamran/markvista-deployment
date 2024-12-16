import RiskProfile from "../../model/b-risk-module/riskprofilemodal.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

// CREATE: Add a new goal to a risk profile
// CREATE: Add a new goal to a risk profile
export const addGoal = catchAsync(async (req, res, next) => {
  const { goalType, goalAmount } = req.body;
  const userId = req.user._id; // Get user ID from authenticated user (assumed to be in req.user)

  // Validate the input
  if (!goalType || !goalAmount) {
    return next(new AppError("Goal type and amount are required.", 400));
  }

  // Fetch the active risk profile for the user
  const activeProfile = await RiskProfile.findOne({ user: userId, ison: true });

  // Check if there's an active risk profile
  if (!activeProfile) {
    return next(
      new AppError("No active Risk Profile found for this user.", 404)
    );
  }

  // Check if the active profile already has a goal
  if (activeProfile.goals.length > 0) {
    return next(
      new AppError(
        "Only one goal is allowed per profile. Please update or delete the existing goal before adding a new one.",
        400
      )
    );
  }

  // Add the new goal
  activeProfile.goals.push({ goalType, goalAmount });
  await activeProfile.save();

  res.status(201).json({
    status: "success",
    message: "Goal added successfully.",
    data: activeProfile,
  });
});

// READ: Get all goals for a risk profile
export const getGoals = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const activeProfile = await RiskProfile.findOne({ user: userId, ison: true });

  if (!activeProfile) {
    return next(
      new AppError("No active Risk Profile found for this user.", 404)
    );
  }

  res.status(200).json({
    status: "success",
    goals: activeProfile.goals,
  });
});

// UPDATE: Update a specific goal in a risk profile
export const updateGoal = catchAsync(async (req, res, next) => {
  const { goalId, goalType, goalAmount } = req.body;
  const userId = req.user._id;

  if (!goalId || (!goalType && !goalAmount)) {
    return next(
      new AppError(
        "Goal ID and at least one field to update are required.",
        400
      )
    );
  }

  const activeProfile = await RiskProfile.findOne({ user: userId, ison: true });

  if (!activeProfile) {
    return next(
      new AppError("No active Risk Profile found for this user.", 404)
    );
  }

  const goal = activeProfile.goals.id(goalId);

  if (!goal) {
    return next(new AppError("Goal not found.", 404));
  }

  if (goalType) goal.goalType = goalType;
  if (goalAmount) goal.goalAmount = goalAmount;

  await activeProfile.save();

  res.status(200).json({
    status: "success",
    message: "Goal updated successfully.",
    goal,
  });
});

// DELETE: Remove a specific goal from a risk profile
export const deleteGoal = catchAsync(async (req, res, next) => {
  const { goalId } = req.params;
  const userId = req.user._id;

  if (!goalId) {
    return next(new AppError("Goal ID is required.", 400));
  }

  const activeProfile = await RiskProfile.findOne({ user: userId, ison: true });

  if (!activeProfile) {
    return next(
      new AppError("No active Risk Profile found for this user.", 404)
    );
  }

  const goal = activeProfile.goals.id(goalId);

  if (!goal) {
    return next(new AppError("Goal not found.", 404));
  }

  activeProfile.goals.pull(goalId);
  await activeProfile.save();

  res.status(200).json({
    status: "success",
    message: "Goal deleted successfully.",
  });
});
