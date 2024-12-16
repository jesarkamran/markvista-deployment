const Tabledata = ({ data, setData }) => {
  return (
    <div className="overflow-x-auto bg-gray-50 p-4 dark:bg-[#272424]">
      <div className="rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white text-left text-sm text-gray-600 dark:text-gray-200">
          <thead className="bg-gray-200 text-gray-700 dark:bg-[#302c2c] dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 font-medium">No</th>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Trade Direction</th>
              <th className="px-4 py-2 font-medium">Risk %</th>
              <th className="px-4 py-2 font-medium">Outcome</th>
              <th className="px-4 py-2 font-medium">PNL (USD)</th>
              <th className="px-4 py-2 font-medium">Payout</th>
              <th className="px-4 py-2 font-medium">New Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-[var(--color-section)]"
                    : "bg-white dark:bg-[var(--color-background)]"
                } hover:bg-blue-50 dark:hover:opacity-50`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.Date}</td>
                <td className="px-4 py-2">{item.TradeDirection}</td>
                <td className="px-4 py-2">{item.RiskPercentage}</td>
                <td className="px-4 py-2">{item.Outcome}</td>
                <td className="px-4 py-2">{item.PNL}</td>
                <td className="px-4 py-2">{item.Payout}</td>
                <td className="px-4 py-2">{item.NewBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabledata;
