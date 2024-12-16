import express from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";

import configureMiddlewares from "../middleware/configureMiddlewares.js";
import AppError from "../utils/appError.js";
import globalErrorHandler from "../controller/errorController.js";

// configuering the .env
config({ path: "./config.env" });

function createApp(route, router, name, corsOptions) {
  const app = express();

  // Static file serving
  app.use("/images", express.static(process.env.PROFILE_IMG_PATH));

  // Configuring all the middleware
  configureMiddlewares(app);

  // More permissive CORS configuration
  app.use(
    cors({
      origin: "https://markvista-frontend.vercel.app", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: [
        "x-access-token",
        "Origin",
        "Content-Type",
        "Accept",
        "Authorization",
      ],
      credentials: true,
    })
  );

  // routes
  app.use(route, router);

  app.all("*", (req, _, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server!!`), 404);
  });

  app.use(globalErrorHandler);
  return app;
}

export default createApp;
