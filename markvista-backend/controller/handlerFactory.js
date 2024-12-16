import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

export function createOne(model) {
  return catchAsync(async (req, res) => {
    const newDoc = await model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });
}

export function getOne(model, popOptions) {
  return catchAsync(async (req, res, next) => {
    let query = model.findById(req.params.id);
    if (popOptions) query = query.populate("reviews");

    const doc = await query;

    if (!doc) return next(new AppError("No document Found with given id", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

export function getAll(model) {
  return catchAsync(async (req, res, next) => {
    // To fetch Review on the basis of tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = await new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .projection()
      .pagination();
    const docs = await features.query;
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
}

export function deleteOne(model, options) {
  return catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No document Found with given id", 404));
    if (options.updateTour) model.calcAverageRatings(doc.tour);
    res.status(204).json({
      status: "success",
      message: "Document Deleted Successfully",
    });
  });
}

export function updateOne(model) {
  return catchAsync(async (req, res, next) => {
    const updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc)
      // No document found
      return next(new AppError("No doc Found with given id", 404));

    res.status(201).json({
      status: "success",
      data: {
        data: updatedDoc,
      },
    });
  });
}
