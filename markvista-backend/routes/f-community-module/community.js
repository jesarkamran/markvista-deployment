import { Router } from "express";
import {
  postQuery,
  answerQuery,
  editAnswer,
  deleteQueryOrAnswer,
  likeOrDislikeInteraction,
} from "../../controller/f-community-module/queryPostController.js";

import {
  getAllQueries,
  getAnswer,
  getQuery,
} from "../../controller/f-community-module/queryGetController.js";

import {
  addAchievement,
  addSpecialBadge,
  getUserCommunityProfile,
  updateCommunityActivity,
} from "../../controller/f-community-module/communityController.js";

import { protect } from "../../controller/a-profile-module/authController.js";
import { upload, uploadToCloudinary } from "../../utils/imageUpload.js";

const communityRouter = Router();

// Public Routes
communityRouter.get("/queries", getAllQueries); // Get all queries
communityRouter.get("/:queryId", getQuery); // Get a specific query by ID with answers

// Protected Routes
communityRouter.use(protect); // Protect all routes below this middleware
communityRouter.get("/answer/:answerId", getAnswer);
// Query Interaction Routes
communityRouter.post(
  "/",
  upload.single("photo"),
  uploadToCloudinary,
  postQuery
); // Post a query
communityRouter.post("/answer/:queryId", answerQuery); // Post an answer to a query
communityRouter.patch("/edit-answer/:answerId", editAnswer); // Edit a query
communityRouter.delete(
  "/delete-query-or-answer/:interactionId",
  deleteQueryOrAnswer
); // Delete a query or an answer
communityRouter.put("/like-dislike/:interactionId", likeOrDislikeInteraction); // Like or dislike a query/answer

// Community Activity Routes
communityRouter.get("/profile/:userId?", getUserCommunityProfile);

// Update community activity
communityRouter.post("/activity", updateCommunityActivity);

// Add achievement
communityRouter.post("/achievements", addAchievement);

// Add special badge
communityRouter.post("/badges", addSpecialBadge);

export default communityRouter;
