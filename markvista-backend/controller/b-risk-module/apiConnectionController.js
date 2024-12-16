import ApiConnection from "../../model/b-risk-module/ApiConnection.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

// Controller to add API Key and Secret Key
export const addApiConnection = catchAsync(async (req, res, next) => {
  let { apiKey, secretKey } = req.body;
  const userId = req.user._id; // Assuming the user ID is in the req.user object from authentication middleware

  // Sanitize inputs: Remove commas and other unnecessary symbols
  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9]/g, ""); // Allow only alphanumeric characters

  apiKey = sanitizeInput(apiKey);
  secretKey = sanitizeInput(secretKey);

  // Check if the API Key already exists for the user
  const existingConnection = await ApiConnection.findOne({
    apiKey,
    user: userId,
  });
  if (existingConnection) {
    return next(new AppError("API Key already exists for this user.", 400));
  }

  // Create and save new record with user reference
  const newConnection = new ApiConnection({ apiKey, secretKey, user: userId });
  await newConnection.save();

  res.status(201).json({
    status: "success",
    message: "API Key and Secret Key added successfully.",
    data: newConnection,
  });
});

// Controller to fetch API Key and Secret Key
export const getApiConnection = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Get user ID from authenticated user (assumed to be in req.user)

  // Find the API connection for the authenticated user
  const connection = await ApiConnection.findOne({ user: userId });
  if (!connection) {
    return next(
      new AppError("No API Key and Secret Key found for this user.", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: connection,
  });
});

// Controller to delete API Key and Secret Key
export const deleteApiConnection = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Get user ID from authenticated user (assumed to be in req.user)

  // Find the API connection for the authenticated user
  const connection = await ApiConnection.findOne({ user: userId });
  if (!connection) {
    return next(
      new AppError(
        "No API Key and Secret Key found to delete for this user.",
        404
      )
    );
  }

  // Delete the API connection
  await ApiConnection.deleteOne({ _id: connection._id });

  res.status(200).json({
    status: "success",
    message: "API Key and Secret Key deleted successfully.",
  });
});
