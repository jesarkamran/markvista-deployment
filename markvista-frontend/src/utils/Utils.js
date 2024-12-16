import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("./src/css/tailwind.config.js");
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};
export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export default function formatCryptoData(stockData) {
  //   console.log(data);
  // Time Series (Digital Currency Weekly)
  if (!stockData) return;
  let formattedData = [];
  if (stockData["Time Series (Digital Currency Weekly)"]) {
    formattedData = Object.entries(
      stockData["Time Series (Digital Currency Weekly)"],
    ).map(([key, value]) => {
      //   console.log(key, value);
      // formattedData = value;
      return {
        x: new Date(key),
        y: [
          value["1. open"],
          value["2. high"],
          value["3. low"],
          value["4. close"],
        ],
      };
    });
    // console.log(formattedData);
  }
  return formattedData;
}
