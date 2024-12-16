import axios from "axios";

export default async function getStockData(symbol) {
  console.log(symbol);

  const data = await axios.get(
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo",
  );
  // console.log(data);

  return data;
}
