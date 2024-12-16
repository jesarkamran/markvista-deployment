import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import createServer from "./services/createServer.js";
import userRouter from "./routes/a-profile-module/user.js";
import communityRouter from "./routes/f-community-module/community.js";
import authRouter from "./routes/a-profile-module/auth.js";
import cryptoDetailsRouter from "./routes/e-userdashboard-module/cryptoDetailsRoutes.js";
import cors from "cors";
import useHeaders from "./middleware/useHeader.js";
import globalErrorHandler from "./controller/errorController.js";
import { config } from "dotenv";

const app = express();

config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security and sanitization middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Logging
app.use(morgan("dev"));

// Headers middleware
app.use(useHeaders);

// Global error handling (typically should be last)
app.use(globalErrorHandler);

// Testing middleware
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
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

// Mounting the Child Apps at Specific Paths
app.use("/api/auth", authRouter);
app.use("/api/crypto", cryptoDetailsRouter);
app.use("/api/users", userRouter); // Mounting User App
app.use("/api/community", communityRouter); // Mounting Community App

app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

const port = process.env.USER_PORT || "8000";
createServer(app, port, "User Server");
