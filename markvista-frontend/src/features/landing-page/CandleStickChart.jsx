import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LiveChart from "./candle-stick/LiveChart";

function CandleStickChart() {
  const [selectedSymbol, setSelectedSymbol] = React.useState("BTC");

  const cryptoSymbols = [
    { value: "BTC", label: "Bitcoin" },
    { value: "ETH", label: "Ethereum" },
    { value: "XRP", label: "Ripple" },
    { value: "ADA", label: "Cardano" },
    { value: "DOGE", label: "Dogecoin" },
  ];

  return (
    <Card className="mb-4 shadow-sm dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          Crypto Price Analysis
        </CardTitle>
        <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Crypto" />
          </SelectTrigger>
          <SelectContent>
            {cryptoSymbols.map((crypto) => (
              <SelectItem key={crypto.value} value={crypto.value}>
                {crypto.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-hidden rounded-b-lg">
          <LiveChart symbol={selectedSymbol} />
        </div>
      </CardContent>
    </Card>
  );
}

export default CandleStickChart;
