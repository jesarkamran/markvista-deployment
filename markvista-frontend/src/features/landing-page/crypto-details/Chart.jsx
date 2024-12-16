import { useQuery } from "@tanstack/react-query";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getChartData } from "./useCryptoDetails";
import Spinner from "../../../components/Spinner";
import { useState } from "react";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-cyan text-sm">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          },
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth={"1px"}
        />
        <CartesianGrid stroke="#707070" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  const { isLoading, data: chartData } = useQuery({
    queryKey: ["chart-data", type, days],
    queryFn: async () => getChartData(id, type, days),
  });
  if (isLoading) return <Spinner />;

  return (
    <div className="h-[60%] w-full">
      <ChartComponent data={chartData} currency="USD" type={type} />
      <div className="flex">
        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            type === "prices"
              ? "bg-green-700 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            type === "market_caps"
              ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            type === "total_volumes"
              ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>

        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            days === 7
              ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            days === 14
              ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`ml-2 rounded bg-opacity-25 px-1.5 py-0.5 text-sm capitalize ${
            days === 30
              ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
              : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
    </div>
  );
};

export default Chart;
