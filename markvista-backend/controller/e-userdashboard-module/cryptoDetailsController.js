import axios from "axios";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";

export const getCryptoCurrencies = catchAsync(async (req, res, next) => {
  const { currency, sortBy, perPage, page } = req.params;
  const coinSearch = req.query.coinSearch || "";

  const resData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&market_data=true`
  );
  const { data } = resData;
  console.log(data.length);

  if (data.length === 0 && coinSearch)
    throw new AppError(`No Coins Found for ${coinSearch}`, 400);

  if (data.length === 0) throw new AppError(`Internal Server Error`, 500);

  res.status(200).json({
    status: "success",
    data,
  });
});

export const getCoinData = catchAsync(async (req, res, next) => {
  const id = req.params.coinId;

  const resData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
  );

  const { data } = resData;

  if (!data) new AppError(`No Coins Found for ${req.params.coinId}`);

  console.log(data.name);

  res.status(200).json({
    status: "success",
    data,
  });
});

export const getChartData = catchAsync(async (req, res, next) => {
  const type = req.params.type;
  console.log(type);

  console.log("RETRIEVING CHART DATA");
  const resData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${req.params.coinId}/market_chart?vs_currency=usd&days=${req.params.days}&interval=daily`
  );

  // console.log(resData);
  console.log(resData.status);

  const { data } = resData;

  if (!data) new AppError(`No Chart data Found for ${req.params.coinId}`);

  let convertedData = data[type].map((item) => {
    return {
      date: new Date(item[0]).toLocaleDateString(),
      [type]: item[1],
    };
  });
  res.status(200).json({
    status: "success",
    chartData: convertedData,
  });
});
export const getMarketSentiment = catchAsync(async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});
