import Answer from "../../model/f-community-module/Answer.js";
import Query from "../../model/f-community-module/Query.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

export const postQuery = catchAsync(async (req, res) => {
  const { title, description, photo: coverImage } = req.body;
  if (!title || !description)
    throw new AppError("Title and description are required.", 400);

  // console.log(req.user.id);
  const query = new Query({
    title,
    description,
    user: req.user.id,
  });

  // Adding coverImage only if it's provided
  if (coverImage) {
    query.coverImage = coverImage;
  }

  await query.save();

  res.status(201).json({
    message: "Query posted successfully.",
    queryId: query._id,
  });
});

export const answerQuery = catchAsync(async (req, res) => {
  const { queryId } = req.params;
  const { answer } = req.body;

  if (!answer) throw new AppError("Answer content is required.", 400);
  const query = await Query.findById(queryId);
  if (!query) throw new AppError("Query not found.", 404);

  const newAnswer = new Answer({
    answer,
    query: queryId,
    user: req.user.id,
  });
  await newAnswer.save();

  // Add the answer to the query's answers array
  query.answers.push(newAnswer._id);
  await query.save();
  res.status(201).json({
    message: "Answer submitted successfully.",
    answerId: newAnswer._id,
  });
});

export const editAnswer = catchAsync(async (req, res) => {
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId);
  if (!answer) {
    throw new AppError("Query not found.", 404);
  }

  if (answer.user.toString() !== req.user.id)
    throw new AppError("User not authorized to edit this answer.", 403);

  if (answer) {
    answer.answer = req.body.answer;
    answer.edited = true;
  }

  await answer.save();
  res.status(200).json({ message: "Answer updated successfully." });
});

export const deleteQueryOrAnswer = catchAsync(async (req, res) => {
  const { interactionId } = req.params;
  let interaction = await Query.findById(interactionId);
  let type = "Query";

  if (!interaction) {
    interaction = await Answer.findById(interactionId);
    type = "Answer";
  }

  if (!interaction) throw new AppError("Interaction not found.", 404);

  if (interaction.user.toString() !== req.user.id)
    throw new AppError("User not authorized to delete this interaction.", 403);

  await interaction.deleteOne();

  // If it's an answer, remove it from its query's answers array
  if (type === "Answer") {
    await Query.findByIdAndUpdate(interaction.query, {
      $pull: { answers: interactionId },
    });
  }

  res.status(200).json({ message: "Interaction deleted successfully." });
});

export const likeOrDislikeInteraction = catchAsync(async (req, res) => {
  const { interactionId } = req.params;
  const { action } = req.query; // 'like' or 'dislike'

  if (!["like", "dislike"].includes(action)) {
    throw new AppError("Invalid action parameter.", 400);
  }

  let interaction = await Query.findById(interactionId);
  if (!interaction) {
    interaction = await Answer.findById(interactionId);
  }

  if (!interaction) throw new AppError("Interaction not found.", 404);

  const userId = req.user.id;

  if (action === "like") {
    // Toggle like
    if (interaction.likes.includes(userId)) {
      // User already liked, remove their like
      interaction.likes = interaction.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Add user to likes
      interaction.likes.push(userId);
      // Remove user from dislikes if they exist there
      interaction.dislikes = interaction.dislikes.filter(
        (id) => id.toString() !== userId
      );
    }
  } else if (action === "dislike") {
    // Toggle dislike
    if (interaction.dislikes.includes(userId)) {
      // User already disliked, remove their dislike
      interaction.dislikes = interaction.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Add user to dislikes
      interaction.dislikes.push(userId);
      // Remove user from likes if they exist there
      interaction.likes = interaction.likes.filter(
        (id) => id.toString() !== userId
      );
    }
  }

  await interaction.save();

  res.status(200).json({
    message: `Interaction ${action} toggled successfully.`,
  });
});
