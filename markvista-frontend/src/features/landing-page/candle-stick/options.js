export const chartOptions = (theme) => {
  const chartTheme = {
    foreColor: theme === "dark" ? "#fff" : "#000",
    background: theme === "dark" ? "#000" : "#fff",
  };

  return {
    chart: {
      type: "candlestick",
      height: 350,
      ...chartTheme,
    },
    title: {
      text: "BTC Candles",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      theme: theme,
      x: {
        format: "dd MMM yyyy", // Example: 22 Aug 2024
      },
    },
  };
};
