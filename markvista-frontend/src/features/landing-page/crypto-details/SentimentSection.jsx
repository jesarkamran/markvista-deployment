import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export const SentimentItem = ({ percentage, type }) => {
  const isUp = type === "up";
  const bgColor = isUp
    ? "bg-green-600 text-green-950 dark:bg-green-900 dark:text-green-400"
    : "bg-red-600 text-red-950 dark:bg-red-900 dark:text-red-400";
  const Icon = isUp ? TiArrowSortedUp : TiArrowSortedDown;

  return (
    <div
      className={`my-1 ml-2 flex items-center rounded bg-opacity-25 px-1 text-sm font-medium uppercase ${bgColor}`}
    >
      <span>{Number(percentage).toFixed(2)}%</span>
      <Icon className="text-lg" />
    </div>
  );
};

const SentimentSection = ({ data }) => (
  <div className="flex flex-col content-start">
    <span className="text-sm capitalize">sentiment</span>
    <div className="flex justify-between">
      <SentimentItem
        percentage={data.sentiment_votes_up_percentage}
        type="up"
      />
    </div>
    <div className="flex justify-between">
      <SentimentItem
        percentage={data.sentiment_votes_down_percentage}
        type="down"
      />
    </div>
  </div>
);

export default SentimentSection;
