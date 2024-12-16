import apiRouter from "../../routes/b-risk-module/api.js";
import goalRouter from "../../routes/b-risk-module/goal.js";
import orderRouter from "../../routes/b-risk-module/order.js";
import riskRouter from "../../routes/b-risk-module/riskprofiles.js";
import createApp from "../createApp.js";
import createServer from "../createServer.js";

const app = createApp(
  "/api/riskProfiles",
  riskRouter,
  "Risk, Order, Trading Panel Server",
  {
    //   origin: "http://localhost:5173", // Replace this with your frontend's URL
    origin: [process.env.MAIN_URL, process.env.ADMIN_URL], // Replace this with your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
);

// Add goalRouter and apiRouter
app.use("/api/goal", goalRouter); // Add goals route
app.use("/api/connection", apiRouter); // Add API connections route
app.use("/api/order", orderRouter);

const port = process.env.RISK_PORT || "8000";

createServer(app, port, "Risk Server");
