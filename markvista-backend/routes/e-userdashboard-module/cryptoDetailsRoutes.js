import { Router } from "express";
import {
  getChartData,
  getCoinData,
  getCryptoCurrencies,
  getMarketSentiment,
} from "../../controller/e-userdashboard-module/cryptoDetailsController.js";

const cryptoDetailsRouter = Router();

cryptoDetailsRouter.get("/", () => console.log("Welcom to Crypto Server"));

cryptoDetailsRouter.get("/chart-data/:coinId/:type/:days", getChartData);
cryptoDetailsRouter.get("/details/:coinId", getCoinData);

cryptoDetailsRouter.get("/global/market-sentiment", getMarketSentiment);

cryptoDetailsRouter.get(
  "/:currency/:sortBy/:page/:perPage",
  getCryptoCurrencies
);

cryptoDetailsRouter.get("/api/fear-greed", async (req, res) => {
  try {
    const response = await axios.get("https://api.alternative.me/fng/");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Fear & Greed Index data:", error.message);
    res.status(500).json({ error: "Failed to fetch Fear & Greed Index data" });
  }
});

export default cryptoDetailsRouter;
