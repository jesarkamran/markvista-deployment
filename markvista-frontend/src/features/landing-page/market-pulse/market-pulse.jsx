import Spinner from "@components/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { axiosCommunity } from "@src/utils/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const MarketPulseCard = () => {
  const [marketPulse, setMarketPulse] = useState({
    btcDominance: null,
    fearGreedIndex: null,
    volumeChange: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMarketPulse = useCallback(async () => {
    try {
      // Proxy-based or backend API endpoints
      const [globalDataResponse, fearGreedResponse] = await Promise.all([
        axios.get("/global/market-sentiment"), // Proxy route for CoinGecko
        axios.get("/api/fear-greed"), // Proxy route for Alternative.me
      ]);

      const globalData = globalDataResponse.data.data;
      const fearGreedData = fearGreedResponse.data.data[0];

      setMarketPulse({
        btcDominance: globalData.market_cap_percentage?.btc || 0,
        fearGreedIndex: fearGreedData?.value || "N/A",
        volumeChange: globalData.total_volume_change_percentage_24h_usd || 0,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching market pulse data", error);
      setMarketPulse({
        btcDominance: 0,
        fearGreedIndex: "N/A",
        volumeChange: 0,
      });
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchMarketPulse();
    const intervalId = setInterval(fetchMarketPulse, 60000); // Refresh data every minute
    return () => clearInterval(intervalId);
  }, [fetchMarketPulse]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card className="bg-white dark:bg-[var(--color-section)]">
      <CardHeader>
        <CardTitle>Market Pulse</CardTitle>
        <CardDescription>Real-time market sentiment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">Bullish</p>
            <p className="text-muted-foreground text-sm">
              Current market sentiment
            </p>
          </div>
          <div className="h-24 w-24">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-xl font-bold text-white">
              75% {/* Placeholder sentiment */}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-green-500">
              ↑ {marketPulse.btcDominance?.toFixed(2)}%
            </p>
            <p className="text-muted-foreground text-sm">BTC Dominance</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-amber-500">
              → {marketPulse.fearGreedIndex}
            </p>
            <p className="text-muted-foreground text-sm">Fear & Greed Index</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-500">
              ↑ {marketPulse.volumeChange?.toFixed(2)}%
            </p>
            <p className="text-muted-foreground text-sm">24h Volume</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPulseCard;
