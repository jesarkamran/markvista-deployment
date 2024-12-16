/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Chart from "./crypto-details/Chart";

import LinksSection from "./crypto-details/LinksSection";
import SocialLinks from "./crypto-details/SocialLinks";
import SentimentSection, {
  SentimentItem,
} from "./crypto-details/SentimentSection";
import RankSection from "./crypto-details/RankSection";
import MetricsSection, { MetricItem } from "./crypto-details/MetricSection";
import CryptoDetailsLogo from "./crypto-details/CryptoDetailsLogo";
import HighLowIndicator from "./crypto-details/HighLowIndicator";
import Spinner from "../../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getCoinData } from "./crypto-details/useCryptoDetails";
import { formatCurrency } from "../../utils/formatter";

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, data } = useQuery({
    queryKey: ["crypto-details", coinId],
    queryFn: async () => getCoinData(coinId),
  });
  // eslint-disable-next-line no-unused-vars
  const [currency, setCurrency] = useState("usd");

  const close = () => {
    navigate(-1);
  };

  return ReactDOM.createPortal(
    <div
      className="first-letter: font-nunito fixed top-0 flex h-full w-full items-center justify-center rounded-md bg-opacity-30 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative h-[85%] w-[80%] rounded-lg border-[1px] border-[var(--color-section)] bg-gray-50 text-gray-600 sm:w-[70%] md:w-[95%] lg:w-[75%] dark:bg-[var(--color-background)] dark:text-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {data?.name ? (
          <div
            style={{ scrollbarWidth: "none" }}
            className="flex h-full w-full flex-col items-center justify-between overflow-y-auto p-4 md:flex-row"
          >
            <div className="flex w-full flex-col pr-2 md:w-1/2">
              <CryptoDetailsLogo data={data} />

              <div className="mt-6 flex w-full">
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-sm capitalize">Price</span>
                    <SentimentItem
                      percentage={Math.abs(
                        data.market_data.price_change_percentage_24h,
                      )}
                      type={
                        data.market_data.price_change_percentage_24h > 0
                          ? "up"
                          : "down"
                      }
                    />
                  </div>
                  <h2 className="text-lg font-bold md:text-xl">
                    {formatCurrency(
                      data.market_data.current_price[currency],
                      currency,
                    )}
                  </h2>
                </div>
              </div>

              {/* MetricItem components */}
              <div className="mt-4 flex w-full flex-wrap justify-between md:flex-nowrap">
                <MetricItem
                  label="Market Cap"
                  value={data.market_data.market_cap[currency]}
                  currency={currency}
                  formatOptions={{ minimumFractionDigits: 0 }}
                />
                <MetricItem
                  label="Fully Diluted Valuation"
                  value={data.market_data.fully_diluted_valuation[currency]}
                  currency={currency}
                  formatOptions={{ notation: "compact" }}
                />
              </div>

              <div className="mt-4 flex w-full flex-col">
                <MetricItem
                  label="Total Volume"
                  value={data.market_data.total_volume[currency]}
                  currency={currency}
                  formatOptions={{ minimumFractionDigits: 0 }}
                />
              </div>

              <div className="mt-4 flex w-full justify-between">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <MetricsSection
                market_data={data.market_data}
                currency={currency}
              />

              <div className="mt-4 flex w-full flex-wrap justify-between md:flex-nowrap">
                <LinksSection links={data.links} />
                <SentimentSection data={data} />
              </div>
            </div>
            <div className="mt-4 flex h-full w-full flex-col justify-between gap-5 pl-3 sm:mt-0 sm:justify-normal sm:gap-0 md:w-[55%]">
              <Chart id={data.id} />
              <RankSection data={data} />
              <SocialLinks links={data.links} />
            </div>
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("root"),
  );
};

export default CryptoDetails;
