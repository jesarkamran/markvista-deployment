import cryptoDetailsRouter from "../../routes/e-userdashboard-module/cryptoDetailsRoutes.js";

import createApp from "../createApp.js";
import createServer from "../createServer.js";

const app = createApp(
  "/api/crypto",
  cryptoDetailsRouter,
  "Crypto Details Server",
  { origin: "http://localhost:5173" }
);

const port = process.env.CRYPTO_DETAILS_PORT || "8000";
createServer(app, port, "Crypto Server", false);
