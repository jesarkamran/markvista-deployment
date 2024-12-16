import { useEffect, useState } from "react";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="h-1.5 w-[50%] rounded-l-lg bg-red-500"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="h-1.5 w-[50%] rounded-r-lg bg-green-500 bg-opacity-70"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

export default HighLowIndicator;
