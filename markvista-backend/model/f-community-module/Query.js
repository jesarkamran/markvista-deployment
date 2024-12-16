import { Schema, model } from "mongoose";
import InteractionMixin from "./commonMethods.js";
// Define the schema for a Query
const QuerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    coverImage: String,
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming a User model exists for authentication
      required: true,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer", // Reference to the Answer model
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

QuerySchema.methods = { ...InteractionMixin };
// Compile models
const Query = model("Query", QuerySchema);

export default Query;
