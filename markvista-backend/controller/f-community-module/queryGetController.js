import { query } from "express";
import Answer from "../../model/f-community-module/Answer.js";
import Query from "../../model/f-community-module/Query.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

export const getAllQueries = catchAsync(async (req, res) => {
  const { search, sort, order } = req.query;

  console.log(req.query);

  // Build the query object for filtering
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } }, // Case-insensitive title match
      { description: { $regex: search, $options: "i" } }, // Case-insensitive description match
    ];
  }

  // Define sort options
  let sortOption = {};
  if (sort === "likes") {
    sortOption = { likes: order === "asc" ? 1 : -1 }; // Sort by likes
  } else if (sort === "answers") {
    sortOption = { answers: order === "asc" ? 1 : -1 }; // Sort by answers
  }

  // Fetch queries with filtering and sorting
  const queries = await Query.find(query)
    .sort(sortOption) // Apply sorting
    .populate({
      path: "user",
      select: "name photo", // Specify fields to select
    })
    .select("title description likes dislikes createdAt answers");

  // Reverse the queries if no sort is specified (preserve previous functionality)
  if (!sort) {
    queries.reverse();
  }

  // Map the results
  const result = queries.map((query) => ({
    id: query._id,
    title: query.title,
    coverImage: query.coverImage,
    description: query.description,
    createdAt: query.createdAt,
    likes: query.likes,
    dislikes: query.dislikes,
    answers: query.answers,
    author: {
      name: query.user?.name || "Anonymous",
      photo: query.user?.photo,
    },
  }));

  res.status(200).json(result);
});

export const getQuery = catchAsync(async (req, res) => {
  const { queryId } = req.params;

  const query = await Query.findById(queryId)
    .populate({
      path: "answers",
      populate: { path: "user", select: "name photo" }, // Populate the user for each answer
    })
    .populate({ path: "user", select: "name photo" });

  if (!query) {
    return res.status(404).json({ error: "Query not found." });
  }

  const response = {
    id: query._id,
    title: query.title,
    description: query.description,
    coverImage: query.coverImage,
    createdAt: query.createdAt,
    likes: query.likes,
    dislikes: query.dislikes,
    author: {
      id: query.user._id,
      name: query.user?.name || "Anonymous",
      photo: query.user?.photo,
    },
    answers: query.answers.map((answer) => ({
      id: answer._id,
      content: answer.answer,
      author: {
        id: answer.user._id,
        name: answer.user?.name || "Anonymous",
        photo: answer.user?.photo,
      },
      createdAt: answer.createdAt,
      likes: answer.likes,
      dislikes: answer.dislikes,
      edited: answer.edited,
    })),
  };

  res.status(200).json(response);
});

export const getAnswer = catchAsync(async (req, res) => {
  const { answerId } = req.params;

  const answer = await Answer.findById(answerId)
    .populate("user", "name")
    .select("answer createdAt likes dislikes edited");

  if (!answer) throw new AppError("No answer found with given Id", 404);

  const response = {
    id: answer._id,
    content: answer.answer,
    author: answer.user?.name || "Anonymous",
    createdAt: answer.createdAt,
    likes: answer.likes.length,
    dislikes: answer.dislikes.length,
    edited: answer.edited,
  };

  res.status(200).json(response);
});
