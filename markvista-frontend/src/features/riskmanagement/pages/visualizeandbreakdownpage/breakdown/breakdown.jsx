import { useState, useEffect } from "react";
import "./breakdown.css";
import { generateData } from "../../../constants/index";
import {
  Calculator,
  HelpCircle,
  Play,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import BackButton from "@components/BackButton";

const Breakdown = ({ id, setData, setIsStrategyRun }) => {
  const [winRate, setWinRate] = useState("");
  const [riskRewardRatio, setRiskRewardRatio] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [numTrades, setNumTrades] = useState("");
  const [riskProfile, setRiskProfile] = useState(null);
  const [breakdownResults, setBreakdownResults] = useState({
    winRate: 0,
    trades: 0,
    wins: 0,
    losses: 0,
    usdWon: 0,
    usdLost: 0,
    netProfitLoss: 0,
  });
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchRiskProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/riskprofiles/${id}`,
        );
        const data = await response.json();
        setRiskProfile(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRiskProfile();
  }, [id]);

  const handleRunStrategy = () => {
    if (!riskProfile) return;

    const parsedWinRate = parseFloat(winRate) || 0;
    const parsedRiskRewardRatio = parseFloat(riskRewardRatio) || 0;
    const parsedAccountSize = parseFloat(accountSize) || 0;
    const parsedNumTrades = parseFloat(numTrades) || 0;

    // Check if the riskRewardRatio is less than the minimum defined in the risk profile
    if (parsedRiskRewardRatio < riskProfile.minRiskRewardRatio) {
      alert(
        `Risk to Reward Ratio cannot be less than ${riskProfile.minRiskRewardRatio}`,
      );
      return; // Exit the function if the condition is met
    }

    // setError(''); // Clear error if validation passes

    const data = generateData(
      parsedNumTrades,
      parsedWinRate / 100,
      parsedRiskRewardRatio,
      parsedAccountSize,
      riskProfile.initialRiskPerTrade,
      riskProfile.increaseOnWin,
      riskProfile.decreaseOnLoss,
      riskProfile.maxRisk,
      riskProfile.minRisk,
      riskProfile.reset,
      riskProfile.growthThreshold,
      riskProfile.payoutPercentage,
      riskProfile.SLallowedperday,
    );

    const wins = data.filter((trade) => trade.Outcome === "Win").length;
    const losses = data.length - wins;
    const usdWon = data.reduce(
      (acc, trade) => acc + (trade.PNL > 0 ? parseFloat(trade.PNL) : 0),
      0,
    );
    const usdLost = data.reduce(
      (acc, trade) => acc + (trade.PNL < 0 ? parseFloat(trade.PNL) : 0),
      0,
    );
    const netProfitLoss = usdWon + usdLost;

    setBreakdownResults({
      winRate: (wins / data.length) * 100,
      trades: data.length,
      wins: wins,
      losses: losses,
      usdWon: usdWon,
      usdLost: usdLost,
      netProfitLoss: netProfitLoss,
    });

    setData(data);
    setIsStrategyRun(true); // Set strategy as run
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid gap-6 rounded-2xl border border-gray-600 border-opacity-45 bg-white shadow-lg md:grid-cols-2 dark:bg-[var(--color-background)]">
        {/* First Column - Input Section */}
        <div className="rounded-l-2xl bg-gray-100 p-6 dark:bg-[var(--color-section)]">
          <div className="mb-6 flex items-center">
            <BackButton type="no-tail" />
            <Calculator className="mr-3 text-blue-600" size={32} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {riskProfile?.title || "Strategy Breakdown"}
            </h2>
          </div>

          <div className="space-y-4">
            <InputField
              label="Winrate"
              value={winRate}
              onChange={setWinRate}
              tooltipText="Percentage of winning trades"
            />
            <InputField
              label="Risk to Reward Ratio"
              value={riskRewardRatio}
              onChange={setRiskRewardRatio}
              tooltipText="Risk to reward ratio for trades"
            />
            <InputField
              label="Account Size"
              value={accountSize}
              onChange={setAccountSize}
              tooltipText="Size of the trading account"
            />
            <InputField
              label="No of Trades"
              value={numTrades}
              onChange={setNumTrades}
              step="1"
              tooltipText="Total number of trades"
            />

            <button
              onClick={handleRunStrategy}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Play className="mr-2" size={20} />
              Run Strategy
            </button>

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>

        {/* Second Column - Breakdown Results */}
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <PieChart className="mr-3 text-green-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Breakdown
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <TrendingUp className="text-green-500" />,
                label: "Win Rate",
                value: `${breakdownResults.winRate.toFixed(2)}%`,
              },
              {
                icon: <Calculator className="text-blue-500" />,
                label: "Trades",
                value: breakdownResults.trades,
              },
              {
                icon: <TrendingUp className="text-emerald-500" />,
                label: "Wins",
                value: breakdownResults.wins,
              },
              {
                icon: <TrendingDown className="text-red-500" />,
                label: "Losses",
                value: breakdownResults.losses,
              },
              {
                icon: <DollarSign className="text-green-600" />,
                label: "USD Won",
                value: `$${breakdownResults.usdWon.toFixed(2)}`,
              },
              {
                icon: <DollarSign className="text-red-600" />,
                label: "USD Lost",
                value: `$${breakdownResults.usdLost.toFixed(2)}`,
              },
              {
                icon: <DollarSign className="text-blue-600" />,
                label: "Net Profit/Loss",
                value: `$${breakdownResults.netProfitLoss.toFixed(2)}`,
                colSpan: "col-span-2",
              },
            ].map(({ icon, label, value, colSpan = "" }) => (
              <div
                key={label}
                className={`flex items-center rounded-lg bg-gray-100 p-4 dark:bg-[var(--color-section)] ${colSpan}`}
              >
                <div className="mr-4">{icon}</div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {label}
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;

const Tooltip = ({ text }) => (
  <div
    className="group relative ml-2 inline-block cursor-help"
    aria-label={text}
  >
    <HelpCircle
      size={16}
      className="text-gray-500 transition-colors group-hover:text-blue-600"
    />
    <span className="absolute bottom-full left-1/2 z-10 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-400 px-3 py-2 text-xs text-white shadow-lg group-hover:block dark:bg-[var(--color-background)]">
      {text}
    </span>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  type = "number",
  step = "0.01",
  tooltipText,
}) => (
  <div className="mb-4">
    <div className="mb-2 flex items-center">
      <label className="block font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {tooltipText && <Tooltip text={tooltipText} />}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      step={step}
      className="w-full rounded-lg border border-gray-300 border-opacity-25 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[var(--color-background)] dark:text-gray-100"
    />
  </div>
);
