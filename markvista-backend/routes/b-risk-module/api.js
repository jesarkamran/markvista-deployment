import { Router } from "express";
import {
  addApiConnection,
  getApiConnection,
  deleteApiConnection,
} from "../../controller/b-risk-module/apiConnectionController.js";
import { protect } from "../../controller/a-profile-module/authController.js";

const apiRouter = Router();

apiRouter.use(protect);

// Route to add API connection
apiRouter.post("/api-connection", addApiConnection);

// Route to get API connection
apiRouter.get("/api-connection", getApiConnection);

// Route to delete API connection
apiRouter.delete("/api-connection", deleteApiConnection);

export default apiRouter;
