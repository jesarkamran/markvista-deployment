import btcIcon from "../../../assets/images/bitcoin.png";
import ethIcon from "../../../assets/images/ethereum.png";
import bnbIcon from "../../../assets/images/binance-coin.png";
import usdtIcon from "../../../assets/images/tether.png";
import { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import CurrencyCard from "@components/cards/CurrencyCard";
import Spinner from "@components/Spinner";

const CryptoPrices = memo(({ prices }) => (
  <>
    <CurrencyCard
      coinName="Bitcoin"
      coinCode="BTC/USD"
      coinIcon={btcIcon}
      price={prices.BTC.toFixed(2)}
    />
    <CurrencyCard
      coinName="Ethereum"
      coinCode="ETH/USD"
      coinIcon={ethIcon}
      price={prices.ETH.toFixed(2)}
    />
    <CurrencyCard
      coinName="Tether"
      coinCode="USDT/USD"
      coinIcon={usdtIcon}
      price={prices.USDT.toFixed(2)}
    />
    <CurrencyCard
      coinName="BNBCoin"
      coinCode="BNB/USD"
      coinIcon={bnbIcon}
      price={prices.BNB.toFixed(2)}
    />
  </>
));

CryptoPrices.displayName = "CryptoPrices";

const GetDashboardCards = () => {
  const [prices, setPrices] = useState({
    BTC: null,
    ETH: null,
    USDT: null,
    BNB: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "bitcoin,ethereum,tether,binancecoin",
            vs_currencies: "usd",
          },
        },
      );

      setPrices({
        BTC: response.data.bitcoin.usd,
        ETH: response.data.ethereum.usd,
        USDT: response.data.tether.usd,
        BNB: response.data.binancecoin.usd,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data from CoinGecko", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const intervalId = setInterval(fetchPrices, 5000);
    return () => clearInterval(intervalId);
  }, [fetchPrices]);

  if (isLoading || !prices.BTC) {
    return <Spinner />;
  }

  return <CryptoPrices prices={prices} />;
};

export default GetDashboardCards;
