import RiskProfile from "../../model/b-risk-module/riskprofilemodal.js";
import { Types } from "mongoose";

// Get all risk profiles
export const getAllRiskProfiles = async (req, res) => {
  try {
    const riskProfiles = await RiskProfile.find({});
    res.status(200).json(riskProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching risk profiles", error: error.message });
  }
};

// Get a single risk profile
export const getSingleRiskProfile = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const riskProfile = await RiskProfile.findById(id);
    if (!riskProfile) {
      return res.status(404).json({ message: "Risk profile not found" });
    }
    res.status(200).json(riskProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching risk profile", error: error.message });
  }
};

// Create a new risk profile
export const createRiskProfile = async (req, res, next) => {
  const {
    title,
    description,
    SLallowedperday,
    initialRiskPerTrade,
    increaseOnWin,
    decreaseOnLoss,
    maxRisk,
    minRisk,
    reset,
    growthThreshold,
    payoutPercentage,
  } = req.body;

  try {
    const newRiskProfile = await RiskProfile.create({
      title,
      description,
      SLallowedperday,
      initialRiskPerTrade,
      increaseOnWin,
      decreaseOnLoss,
      maxRisk,
      minRisk,
      reset,
      growthThreshold,
      payoutPercentage,
    });
    res
      .status(201)
      .json({ message: "New risk profile created", data: newRiskProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating risk profile", error: error.message });
  }
};

// Delete a risk profile
export const deleteRiskProfile = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedRiskProfile = await RiskProfile.findByIdAndDelete(id);
    if (!deletedRiskProfile) {
      return res.status(404).json({ message: "Risk profile not found" });
    }
    res
      .status(200)
      .json({ message: "Risk profile deleted", data: deletedRiskProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting risk profile", error: error.message });
  }
};

// Update a risk profile
export const updateRiskProfile = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const updates = req.body;

  try {
    const updatedRiskProfile = await RiskProfile.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    if (!updatedRiskProfile) {
      return res.status(404).json({ message: "Risk profile not found" });
    }
    res
      .status(200)
      .json({ message: "Risk profile updated", data: updatedRiskProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating risk profile", error: error.message });
  }
};
