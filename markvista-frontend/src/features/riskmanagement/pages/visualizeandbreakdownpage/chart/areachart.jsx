import Achart from "../../../containers/Areachart/Achart";

const Areachart = ({ data }) => {
  // Extracting only 'No' and 'NewBalance' fields for the chart
  const chartData = data.map((item) => ({
    No: item.No,
    AccountBalance: item.NewBalance,
  }));

  return (
    <div className="bg-[var(--color-background)] p-6">
      <div className="rounded-lg bg-[var(--color-section)] p-6 shadow-md transition duration-300">
        <p className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          Account Growth Over Number of Trades
        </p>
        <div className="h-[300px]">
          <Achart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Areachart;
