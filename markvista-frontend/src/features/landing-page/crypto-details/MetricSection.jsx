import { formatCurrency } from "../../../utils/formatter";

export const MetricItem = ({
  label,
  value,
  currency,
  formatOptions,
  color = "dark:text-gray-100 text-gray-600",
}) => (
  <div className="flex flex-col">
    <span className={`text-sm capitalize ${color}`}>{label}</span>
    <h2 className="text-base font-bold">
      {formatCurrency(value, currency, formatOptions)}
    </h2>
  </div>
);

const MetricsSection = ({ market_data, currency }) => (
  <>
    <div className="mt-4 flex w-full justify-between">
      <MetricItem
        label="Low 24H"
        value={market_data.low_24h[currency]}
        currency={currency}
        formatOptions={{ minimumFractionDigits: 5 }}
        color="px-1 rounded-sm w-max text-red-500 bg-opacity-25 bg-red-900"
      />
      <MetricItem
        label="High 24H"
        value={market_data.high_24h[currency]}
        currency={currency}
        formatOptions={{ minimumFractionDigits: 5 }}
        color="px-1 rounded-sm w-max text-green-500 bg-opacity-25 bg-green-900"
      />
    </div>

    <div className="mt-4 flex w-full justify-between">
      <MetricItem
        label="Max Supply"
        value={market_data.max_supply}
        currency={currency}
        formatOptions={{ minimumFractionDigits: 0 }}
      />
      <MetricItem
        label="Circulating Supply"
        value={market_data.circulating_supply}
        currency={currency}
        formatOptions={{ minimumFractionDigits: 0 }}
      />
    </div>
  </>
);

export default MetricsSection;
