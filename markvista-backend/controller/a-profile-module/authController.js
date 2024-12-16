import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";

import User from "../../model/a-profile-module/user.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import sendEmail from "../../utils/email.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const createAndSendToken = (user, code, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  if (process.env.NODE_ENV === "development")
    return res.status(code).json({
      status: "success",
      token,
      data: {
        user,
      },
    });

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  user.passwordChangeAt = undefined;
  cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  console.log("....Logged in");

  res.status(code).json({
    status: "success",
    data: {
      user,
    },
  });
};
export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: { user },
  });

  // createAndSendToken(user, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check email or password exist
  if (!email || !password)
    return next(new AppError("Please Provide email and passowrd", 400));

  // check user exist in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Incorrect email or password", 400));

  //   Check provided password is correct or not
  const correct = await user.correctPassword(password, user.password);
  if (!correct) return next(new AppError("Incorrect email or password", 401));

  console.log(req.headers.origin !== process.env.ADMIN_URL);
  console.log("URL:", req.headers.origin);

  if (
    user.role === "admin" && // Assuming `role` is the field for user roles
    req.headers.origin !== process.env.ADMIN_URL
  ) {
    return next(
      new AppError(
        "Admin users can't log in to this web app from this url.",
        403
      )
    );
  }

  if (
    user.role === "user" && // Assuming `role` is the field for user roles
    req.headers.origin !== "https://markvista-frontend.vercel.app"
  ) {
    return next(new AppError("Only Admins can login to this Application", 403));
  }

  console.log("Logging in...");

  // create token
  createAndSendToken(user, 201, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // Check Token
  let token = "";
  if (
    process.env.NODE_ENV === "development" &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (
    process.env.NODE_ENV === "production" &&
    req.headers.cookie &&
    req.headers.cookie.startsWith("jwt")
  )
    token = req.headers.cookie.split("=")[1];

  console.log({ token });
  if (!token)
    return next(
      new AppError("You are not logged in, please log in to get access", 400)
    );

  // Verify Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser)
    return next(
      new AppError("User belonging to this token doesn't exist", 401)
    );

  // Check if user changed password after the JWT was issued
  if (freshUser.afterPasswordChanged(decoded.iat))
    return next(
      new AppError(
        "The user has changed their password recently. Please log in again.",
        401
      )
    );

  // Additional check for admin role
  if (
    req.headers.origin !== process.env.ADMIN_URL &&
    freshUser.role === "admin" // Assuming `role` is the field for user roles
  ) {
    return next(
      new AppError(
        "Admin users can't log in to this web app from this host.",
        403
      )
    );
  }

  req.user = freshUser;
  console.log("Granting Access");
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user);

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you don't have permission to perform this action", 403)
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1 Get user based on the given Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("user doesn't exist for given email"));

  // 2 Generate Random reset token
  const resetToken = user.createPasswordResetToken();
  // Below command validateBeforeSace option stop all validateion to save a document
  await user.save({ validateBeforeSave: false });

  // 3 send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password! Submit Patch request with your new password  and passwordConfirm  to URL: ${resetURL}. If you didn't forget your password please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to your email",
    });
  } catch (error) {
    user.passwordResetToke = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next(
      new AppError(
        "There was an error while sending the email please try again later",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async function (req, res, next) {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user)
    return next(
      new AppError("Invalid Token Provided or the token has expired", 400)
    );

  // 2) If token has not expired, and there is user, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // 3) Update the changedPasswordAt property
  // 4) Log  the user in and send JWT
  await user.save();

  createAndSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from the Collection
  const user = await User.findById(req.user._id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError("Your current Password is wrong", 401));

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, sendJWT
  createAndSendToken(user, 200, res);
});

export const logout = (req, res) => {
  // Clear the JWT cookie by setting it to an empty string and setting expires to a past date
  res.cookie("jwt", "", {
    maxAge: 1, // The cookie will expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // Ensure cross-site issues are handled
  });

  // Send response indicating successful logout
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
