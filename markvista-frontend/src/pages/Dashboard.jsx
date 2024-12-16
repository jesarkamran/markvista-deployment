import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CryptoList from "@features/landing-page/CryptoList";
import NewsList from "@features/landing-page/NewsList";
import CryptoInsightsCard from "@features/landing-page/learnings/crypto-insights";
import GetDashboardCards from "@features/landing-page/crypto-details/GetDashboardCards";
// import MarketPulseCard from "@features/landing-page/market-pulse/market-pulse";

// Market Pulse Card Component
const MarketPulseCard = () => (
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
            75%
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-green-500">↑ 3.2%</p>
          <p className="text-muted-foreground text-sm">BTC Dominance</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-amber-500">→ 52</p>
          <p className="text-muted-foreground text-sm">Fear & Greed Index</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-500">↑ 2.1%</p>
          <p className="text-muted-foreground text-sm">24h Volume</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Crypto Overview Component
export default function CryptoOverview() {
  const [activeInfoTab, setActiveInfoTab] = useState("basics");

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold dark:text-gray-200">
        MarkVista Dashboard
      </h1>
      <div
        style={{ scrollbarWidth: "none" }}
        className="m-2 flex gap-x-2 overflow-auto"
      >
        {/* <GetDashboardCards /> */}
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col gap-y-3">
            <CryptoList />
            <CryptoInsightsCard
              activeInfoTab={activeInfoTab}
              setActiveInfoTab={setActiveInfoTab}
            />
            <MarketPulseCard />
          </div>
        </TabsContent>
        <TabsContent value="news">
          <div className="h-[400px]">
            <NewsList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
