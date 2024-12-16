import express from "express";
import { config } from "dotenv";

import configureMiddlewares from "./middleware/configureMiddlewares.js";
import AppError from "./utils/appError.js";
import authRouter from "./routes/a-profile-module/auth.js";
import userRouter from "./routes/a-profile-module/user.js";
import globalErrorHandler from "./controller/errorController.js";
import communityRouter from "./routes/f-community-module/community.js";

const app = express();

config({ path: "./config.env" });

// Configuring all the middleware
configureMiddlewares(app);

// configuering the .env

// Defining the / route
app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("WELCOME to Server of MarkVista");
});

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/community", communityRouter);
app.use("/api/crypto", cryptoDetailsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!!`), 404);
});

app.use(globalErrorHandler);

// parse requests of content-type - application/x-www-form-urlencoded

export default app;
