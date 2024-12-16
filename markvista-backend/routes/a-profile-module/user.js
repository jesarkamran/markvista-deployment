import { Router } from "express";

import {
  createUser,
  deleteMe,
  deleteUser,
  deleteUserByEmail,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from "../../controller/a-profile-module/userController.js";
import {
  protect,
  updatePassword,
  restrictTo,
  logout,
} from "../../controller/a-profile-module/authController.js";
import { upload, uploadToCloudinary } from "../../utils/imageUpload.js";

const userRouter = Router();

// User Activity Routes
userRouter.use(protect);
userRouter.get("/me", getMe, getUser);
userRouter.patch(
  "/update-me",
  upload.single("photo"),
  uploadToCloudinary,
  updateMe
);
userRouter.delete("/delete-me", deleteMe);
userRouter.patch("/update-my-password", updatePassword);
userRouter.post("/logout", logout);

userRouter.use(restrictTo("admin"));
userRouter.route("/all-users").get(getAllUsers).post(createUser);
userRouter.route("/delete-user/:email").delete(deleteUserByEmail);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(restrictTo("user", "admin"), deleteUser);

export default userRouter;
