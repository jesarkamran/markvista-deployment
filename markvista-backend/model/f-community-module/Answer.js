import { model, Schema } from "mongoose";
import InteractionMixin from "./commonMethods.js";

// Define the schema for an Answer
const AnswerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    query: {
      type: Schema.Types.ObjectId,
      ref: "Query",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    edited: Boolean,
  },
  { timestamps: true }
);

AnswerSchema.methods = { ...InteractionMixin };
const Answer = model("Answer", AnswerSchema);
export default Answer;
