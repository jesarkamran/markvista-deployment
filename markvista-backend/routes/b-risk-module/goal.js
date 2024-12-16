import { Router } from "express";
import {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../../controller/b-risk-module/goalcontroller.js";

import { protect } from "../../controller/a-profile-module/authController.js";

const goalRouter = Router();

goalRouter.use(protect);

// Route to add a new goal
goalRouter.post("/goals", addGoal);

// Route to get all goals
goalRouter.get("/goals", getGoals);

// Route to update a specific goal
goalRouter.patch("/goals/:goalId", updateGoal);

// Route to delete a specific goal
goalRouter.delete("/goals/:goalId", deleteGoal);

export default goalRouter;
