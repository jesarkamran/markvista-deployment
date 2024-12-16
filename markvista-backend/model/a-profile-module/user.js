import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "Every user must have unique email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  passwordChangedAt: Date,
  password: {
    type: String,
    required: [true, "user must set their password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this only works for create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not same",
    },
  },
  active: {
    type: Boolean,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: String,
});

// PASSWORD Encryption
userSchema.pre("save", async function (next) {
  // only runnig this function if the password field is modified
  if (!this.isModified("password")) return;

  // hashing the password field
  this.password = await bcrypt.hash(this.password, 12);

  // deleting the passwrodConfirm field
  this.passwordConfirm = undefined;
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.afterPasswordChanged = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
