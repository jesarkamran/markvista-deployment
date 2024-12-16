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
import globalErrorHandler from "./controller/errorController.js";
import { config } from "dotenv";
import path from "path";
const app = express();

config({ path: "./config.env" });

// CORS Middleware
app.use(
  cors({
    origin: "https://markvista-frontend.vercel.app", // Allow only the frontend origin
    optionsSuccessStatus: 204,
    credentials: true, // Allow credentials (cookies)
  })
);

// Security and sanitization middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Logging
app.use(morgan("dev"));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handling (typically should be last)
app.use(globalErrorHandler);

// Testing middleware
app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/dist");
app.use(express.static(buildPath));
app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../markvista-frontend/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

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
