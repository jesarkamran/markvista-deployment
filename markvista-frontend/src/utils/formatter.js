import { format } from "date-fns";

export const formatCurrency = (value, currency, formatOptions) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    ...formatOptions,
  }).format(value);

export const getTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);
  const diffInMs = currentTime - createdTime;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  return format(createdTime, "MMMM d, yyyy"); // Format date as "Month day, year"
};
