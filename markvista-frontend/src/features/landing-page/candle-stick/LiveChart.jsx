import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";

import getCryptoData from "./service";
import { chartOptions } from "./options";
import formatCryptoData from "../../../utils/Utils";
import { useThemeProvider } from "../../../stores/theme-context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

function LiveChart({ symbol }) {
  const { currentTheme } = useThemeProvider();
  const [seriesData, setSeriesData] = useState();

  const {
    isLoading,
    isError,
    data: stockData,
    error,
    refetch,
  } = useQuery({
    queryKey: [`candle-data-${symbol}`],
    queryFn: () => getCryptoData(symbol),
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (!isLoading && stockData?.data) {
      setSeriesData(formatCryptoData(stockData?.data));
    }
  }, [stockData, isLoading, symbol]);

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-[400px] w-full" />
            <p className="text-gray-500 dark:text-gray-400">
              Loading chart data...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="bg-red-50 dark:bg-red-900/20">
        <CardContent className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
              Failed to Load Chart Data
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              {error instanceof Error
                ? error.message
                : "Unknown error occurred"}
            </p>
          </div>
          <Button
            onClick={() => refetch()}
            variant="destructive"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Loading
          </Button>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (!seriesData || seriesData.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <p className="text-gray-600 dark:text-gray-300">
              No chart data available for {symbol}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render chart
  return (
    <ReactApexChart
      type="candlestick"
      height={450}
      series={[{ data: seriesData }]}
      options={chartOptions(currentTheme)}
    />
  );
}

export default LiveChart;
