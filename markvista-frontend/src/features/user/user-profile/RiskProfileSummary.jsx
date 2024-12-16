const RiskProfileSummary = () => {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold text-blue-400">
        Risk Profile Summary
      </h3>
      <p className="text-gray-400">
        Risk Tolerance:{" "}
        <span className="font-bold text-green-400">Moderate</span>
      </p>
      <p className="text-gray-400">
        Portfolio at Risk: <span className="font-bold text-red-400">12%</span>
      </p>
    </>
  );
};

export default RiskProfileSummary;
