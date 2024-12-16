import express from "express";

import userRouter from "../../routes/a-profile-module/user.js";
import communityRouter from "../../routes/f-community-module/community.js";
import createApp from "../createApp.js";
import createServer from "../createServer.js";
import authApp from "./authService.js";
import cryptoApp from "../e-userdashboard-module/cryptoDetailsService.js";

const userApp = createApp("/", userRouter, "User Server", {
  origin: [process.env.MAIN_URL, process.env.ADMIN_URL], // Replace this with your frontend's URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

// Create Community App
const communityApp = createApp("/", communityRouter, "Community Server", {
  origin: "http://localhost:5173",
  credentials: true,
});

const app = express();
// Mounting the Child Apps at Specific Paths
app.use("/api/auth", authApp);
app.use("/api/crypto", cryptoApp);
app.use("/api/users", userApp); // Mounting User App
app.use("/api/community", communityApp); // Mounting Community App
const port = process.env.USER_PORT || "8000";
createServer(app, port, "User Server");
