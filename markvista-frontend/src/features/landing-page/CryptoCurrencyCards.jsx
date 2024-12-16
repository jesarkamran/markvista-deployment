import btcIcon from "../../assets/images/bitcoin.png";
import ethIcon from "../../assets/images/ethereum.png";
import bnbIcon from "../../assets/images/binance-coin.png";
import usdtIcon from "../../assets/images/tether.png";

import CurrencyCard from "../../components/cards/CurrencyCard";
function CryptoCurrencyCards() {
  return (
    <div className="scroll-w-0 my-5 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap md:overflow-auto">
      <GetDashboardCards />
    </div>
  );
}

export default CryptoCurrencyCards;

export const GetDashboardCards = () => {
  return (
    <>
      <CurrencyCard
        coinName={"Bitcoin"}
        coinCode={"BTC/USD"}
        coinIcon={btcIcon}
        price={"95,431.00"}
      />

      <CurrencyCard
        coinName={"Ethereum"}
        coinCode={"ETH/USD"}
        coinIcon={ethIcon}
        price={"3,617.76"}
      />
      <CurrencyCard
        coinName={"Tether"}
        coinCode={"USDT/USD"}
        coinIcon={usdtIcon}
        price={"1.00"}
      />
      <CurrencyCard
        coinName={"BNBCoin"}
        coinCode={"BNB/USD"}
        coinIcon={bnbIcon}
        price={"640.49"}
      />
    </>
  );
};
