import { Router } from "express";
import {
  activateprofile,
  createRiskProfile,
  deleteRiskProfile,
  getActiveRiskProfile,
  getAllRiskProfiles,
  getSingleRiskProfile,
  resetdefault,
  updateRiskProfile,
} from "../../controller/b-risk-module/riskprofilecontroller.js";
import { protect } from "../../controller/a-profile-module/authController.js";

const riskRouter = Router();

riskRouter.use(protect);

riskRouter.get("/getactive", getActiveRiskProfile);
// Get all risk profiles
riskRouter.get("/", getAllRiskProfiles);

// Get a single risk profile
riskRouter.get("/:id", getSingleRiskProfile);

// Create a new risk profile
riskRouter.post("/", createRiskProfile);
riskRouter.post("/reset-default", resetdefault);

// Delete a risk profile
riskRouter.delete("/:id", deleteRiskProfile);

// Update a risk profile
riskRouter.patch("/:id", updateRiskProfile);
riskRouter.put("/:id/activate", activateprofile); // Activate/deactivate risk profile

export default riskRouter;
