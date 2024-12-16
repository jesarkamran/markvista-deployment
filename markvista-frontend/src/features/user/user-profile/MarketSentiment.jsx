const MarketSentiment = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">Market Sentiment</h3>
      <p className="text-gray-400">
        AI-Generated Predictions:{" "}
        <span className="text-green-400">Bullish</span>
      </p>
      <p className="text-gray-400">
        Current Sentiment:{" "}
        <span className="font-bold text-green-400">65% Bullish</span>,{" "}
        <span className="font-bold text-red-400">35% Bearish</span>
      </p>
    </>
  );
};

export default MarketSentiment;
