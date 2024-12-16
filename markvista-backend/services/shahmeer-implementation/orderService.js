import createApp from "../createApp.js";
import createServer from "../createServer.js";
import orderRouter from "../../routes/b-risk-module/order.js";

const appOrder = createApp(
  "/api/order",
  orderRouter,
  "Order Trading Panel Server",
  {
    //   origin: "http://localhost:5173", // Replace this with your frontend's URL
    origin: [process.env.MAIN_URL, process.env.ADMIN_URL], // Replace this with your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
);

const orderport = process.env.ORDER_PORT || "8000";
createServer(appOrder, orderport, "Order Server");
