const RecentTrades = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">Recent Trades</h3>
      <ul className="ml-5 list-disc text-gray-400">
        <li>
          Bitcoin -{" "}
          <span className="text-green-400">
            Bought at $9,800, Sold at $10,000 (+2%)
          </span>
        </li>
        <li>
          Ethereum -{" "}
          <span className="text-green-400">
            Bought at $7,500, Sold at $8,000 (+6%)
          </span>
        </li>
        <li>
          Cardano -{" "}
          <span className="text-yellow-400">
            Bought at $6,500, Active Order at $7,000
          </span>
        </li>
      </ul>
    </>
  );
};

export default RecentTrades;
