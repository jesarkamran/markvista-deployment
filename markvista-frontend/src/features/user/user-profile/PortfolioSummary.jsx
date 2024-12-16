const PortfolioSummary = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">
        Portfolio Summary
      </h3>
      <p className="text-gray-400">
        Total Portfolio Value:{" "}
        <span className="font-bold text-green-400">$25,000</span>
      </p>
      <p className="text-gray-400">Top Assets:</p>
      <ul className="ml-5 list-disc text-gray-400">
        <li>
          Bitcoin - <span className="text-green-400">$10,000 (+5%)</span>
        </li>
        <li>
          Ethereum - <span className="text-green-400">$8,000 (+3%)</span>
        </li>
        <li>
          Cardano - <span className="text-green-400">$7,000 (+4%)</span>
        </li>
      </ul>
      <p className="mt-4 text-gray-400">
        Financial Goals Progress:{" "}
        <span className="font-bold text-green-400">75%</span>
      </p>
    </>
  );
};

export default PortfolioSummary;
