import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Star,
  Bitcoin,
  EclipseIcon as Ethereum,
  AlertCircle,
  BarChart2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const cryptos = [
  { id: "BTC-USD", name: "Bitcoin", icon: Bitcoin },
  { id: "ETH-USD", name: "Ethereum", icon: Ethereum },
];

const fetchCryptoPrediction = async (currency) => {
  console.log(currency);

  const response = await fetch(
    `http://localhost:5878/predict?currency=${currency}&model_file=${currency.toLowerCase()}_model`,
  );
  if (!response.ok) throw new Error("Failed to fetch prediction data");
  const data = await response.json();
  localStorage.setItem(
    `prediction_data_${currency.toLowerCase()}`,
    JSON.stringify(data),
  );

  console.log(data);

  return data;
};

export default function CryptoPredictionDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC-USD");
  const [prediction, setPrediction] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);

  // Using useMutation to trigger the prediction on button click
  const { mutate, data, error, isError, isPending } = useMutation({
    mutationFn: fetchCryptoPrediction,
  });

  function oldPrediction() {
    console.log(selectedCrypto);

    const storedData = JSON.parse(
      localStorage.getItem(`prediction_data_${selectedCrypto.toLowerCase()}`),
    );
    if (!data && storedData) {
      console.log(selectedCrypto);

      console.log(storedData);

      setPrediction(storedData);

      setPriceHistory(storedData?.prediction_data?.used_data);
    }
  }

  const handleGetPrediction = () => {
    // fetchCryptoPrediction(selectedCrypto);
    mutate(selectedCrypto); // Trigger mutation to get prediction
    setPrediction(
      data || JSON.parse(`prediction_data_${selectedCrypto.toLowerCase()}`),
    );
    console.log(data);

    setPriceHistory(data?.prediction_data?.used_data);
  };

  console.log(selectedCrypto);

  if (isError) return <ErrorState error={error} />;

  return (
    <Card className="mx-auto w-full border-[4px] border-gray-400 bg-gradient-to-br from-white to-gray-400 text-gray-900 dark:from-[var(--color-background)] dark:to-stone-700 dark:text-gray-200">
      <CardHeader>
        <CardTitle>Cryptocurrency Prediction Dashboard</CardTitle>
        <CardDescription>
          Get real-time predictions for cryptocurrency prices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={selectedCrypto}
          onTabChange={setSelectedCrypto}
          className="mb-6"
        >
          <TabsList>
            {cryptos.map((crypto) => (
              <TabsTrigger key={crypto.id} value={crypto.id}>
                <div className="flex items-center justify-center gap-1 rounded-md bg-gradient-to-br from-blue-700 to-blue-800 p-2 text-xl text-white">
                  <crypto.icon className="h-7 w-7 text-yellow-500" />
                  <span>{crypto.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            onClick={handleGetPrediction}
            className="mb-6 bg-gradient-to-br from-blue-700 to-purple-500 p-2 text-lg text-white"
          >
            Get Prediction
          </Button>

          <Button
            onClick={oldPrediction}
            className="mb-6 bg-gradient-to-br from-blue-700 to-purple-500 p-2 text-lg text-white"
          >
            Old Prediction
          </Button>
        </div>

        {isPending ? (
          <LoadingState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <CryptoDetails crypto={selectedCrypto} prediction={prediction} />
            <PriceChart priceHistory={priceHistory} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CryptoDetails({ crypto, prediction }) {
  const [priceData, setPriceData] = useState([]);
  const [priceChange, setPriceChange] = useState({
    value: 0,
    isPositive: true,
  });

  useEffect(() => {
    // Simulate price data for the mini chart
    const data = Array.from({ length: 20 }, (_, i) => ({
      price: prediction.latest_price * (1 + (Math.random() - 0.5) * 0.1),
    }));
    setPriceData(data);

    // Calculate price change
    const change = data[data.length - 1].price - data[0].price;
    setPriceChange({ value: change, isPositive: change >= 0 });
  }, [prediction?.latest_price]);

  const confidenceInterval = prediction?.prediction?.confidence_interval_95;
  const predictedPrice = prediction?.prediction?.prediction_price;

  return (
    <Card className="border border-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[var(--color-background)] dark:to-stone-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          {crypto}
          <Star className="h-4 w-4 text-yellow-400" />
        </CardTitle>
        {priceChange.isPositive ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">
              ${prediction?.prediction_price?.toLocaleString() || "N/A"}
            </div>
            <p className="text-muted-foreground text-sm">Predicted Price</p>
          </div>
          <div className="h-16 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={priceChange.isPositive ? "#10B981" : "#EF4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm font-medium">
              <BarChart2 className="h-4 w-4" /> Price Mean:
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              ${prediction?.prediction?.mean_price?.toLocaleString() || "N/A"}
            </span>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium">
                <AlertCircle className="h-4 w-4" /> Confidence Interval (95%):
              </span>
            </div>
            {confidenceInterval ? (
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${((predictedPrice - confidenceInterval[0]) / (confidenceInterval[1] - confidenceInterval[0])) * 100}%`,
                  }}
                />
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">N/A</span>
            )}
            {confidenceInterval && (
              <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                <span>${confidenceInterval[0].toLocaleString()}</span>
                <span>${confidenceInterval[1].toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PriceChart({ priceHistory }) {
  if (!priceHistory || priceHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No price history data available.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = priceHistory.map((price, index) => ({
    time: index,
    price: price[0],
  }));

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[var(--color-background)] dark:to-stone-700">
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              domain={["auto", "auto"]}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="mx-auto w-full max-w-4xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:from-[var(--color-background)] dark:to-stone-700 dark:text-gray-200">
      <CardHeader>
        <CardTitle>Loading Prediction Data</CardTitle>
        <CardDescription>
          Please wait while we fetch the latest information.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-black dark:border-white"></div>
      </CardContent>
    </Card>
  );
}

function ErrorState({ error }) {
  return (
    <Alert
      variant="destructive"
      className="mx-auto w-full max-w-4xl bg-red-400 text-red-600"
    >
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
        <p className="mt-2 text-sm">
          Possible reasons: Server is not running, API endpoint is incorrect,
          Network connectivity issues, or CORS configuration problems.
        </p>
      </AlertDescription>
    </Alert>
  );
}
