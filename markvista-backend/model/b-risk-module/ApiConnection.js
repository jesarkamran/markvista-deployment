import { Schema, model } from "mongoose";

const ApiConnectionSchema = new Schema(
  {
    apiKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    secretKey: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure each API connection is linked to a user
    },
  },
  { timestamps: true }
);

export default model("ApiConnection", ApiConnectionSchema);
