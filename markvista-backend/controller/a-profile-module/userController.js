import User from "../../model/a-profile-module/user.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import { deleteOne, updateOne, getOne, getAll } from "../handlerFactory.js";
import { createAndSendToken } from "./authController.js";

export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const getUser = getOne(User);
export const getAllUsers = getAll(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((fields) => {
    if (allowedFields.includes(fields)) newObj[fields] = obj[fields];
  });
  return newObj;
};
// Only to Create Admin User
export const createUser = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin" || req.headers.origin !== process.env.ADMIN_URL)
    return next(new AppError("Only Admins Can create Users", 403));

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  console.log("User Created");

  // createAndSendToken(user, 201, res);
  res.status(201).json({
    status: "success",
    data: { user },
  });
});

export const getMe = (req, res, next) => {
  console.log(
    "_____*********Logging User Id: ",
    req.user,
    "**********________"
  );

  req.params.id = req.user.id;

  next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("Can't update password here; use /update-my-password", 400)
    );
  }

  // Filter the fields that are allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "photo");

  // If a new photo was uploaded via Cloudinary
  if (req.body.photo) {
    filteredBody.photo = req.body.photo;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// */

export const deleteMe = catchAsync(async function (req, res, next) {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// export const deleteUserByEmail = catchAsync(async function (req, res, next) {
//   const { email } = req.params; // Destructure email from req.params
//   if (!email) return next(new AppError("No email provided", 400)); // Use correct HTTP status code for a bad request

//   const user = await User.findOneAndDelete({ email }); // Correct method for deleting a user

//   if (!user)
//     return next(new AppError("User not found with the provided email", 404)); // Handle case where user doesn't exist

//   res.status(204).json({
//     status: "success",
//     data: null, // 204 responses typically do not include a body
//   });
// });

export const deleteUserByEmail = catchAsync(async function (req, res, next) {
  const { email } = req.params; // Destructure email from req.params
  if (!email) return next(new AppError("No email provided", 400)); // Use correct HTTP status code for a bad request

  // Find the user by email

  console.log(email);

  const user = await User.findOne({ email });
  console.log(user);

  if (!user)
    return next(new AppError("User not found with the provided email", 404)); // Handle case where user doesn't exist

  // Delete the user
  await User.deleteOne({ email });

  res.status(204).json({
    status: "success",
    data: null, // 204 responses typically do not include a body
  });
});
