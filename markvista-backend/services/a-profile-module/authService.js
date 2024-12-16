import authRouter from "../../routes/a-profile-module/auth.js";

import createApp from "../createApp.js";
import createServer from "../createServer.js";

const authApp = createApp("/", authRouter, "Auth Server", {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
});

export default authApp;

const port = process.env.AUTH_PORT || "8000";
createServer(app, port, "Auth Server");
