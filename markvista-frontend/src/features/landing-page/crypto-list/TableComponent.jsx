import { useQuery } from "@tanstack/react-query";
import useCryptoContext from "../../../stores/crypto-context/useCryptoContext";
import { Link } from "react-router-dom";

import Spinner from "../../../components/Spinner";
import { getCryptoData } from "../crypto-details/useCryptoDetails";
import { formatCurrency } from "../../../utils/formatter";

const TableComponent = () => {
  let {
    setCryptoData,
    page,
    perPage,
    totalPages,
    coinSearch,
    sortBy,
    currency,
    error,
  } = useCryptoContext();
  const { isLoading, data: cryptoData } = useQuery({
    queryKey: ["currencies", page, sortBy, currency, coinSearch],
    queryFn: () =>
      getCryptoData(currency, sortBy, perPage, page, coinSearch, setCryptoData),
    maxPages: totalPages,
  });

  if (isLoading)
    return (
      <div className="ml-52 flex h-[50vh] items-center">
        <Spinner name="loading..." />
      </div>
    );

  return (
    <>
      <div className="flex flex-col rounded border border-gray-300 bg-white dark:border-[var(--color-background)] dark:border-opacity-25 dark:bg-[var(--color-section)]">
        {cryptoData ? (
          <table className="table-auto">
            <thead className="border-b-2 border-gray-200 text-base text-sm font-medium capitalize text-gray-600 dark:border-[var(--color-background)] dark:border-opacity-15 dark:text-gray-100">
              <tr>
                <th className="px-1 py-2">asset</th>
                <th className="px-1 py-2">name</th>
                <th className="px-1 py-2">price</th>
                <th className="px-1 py-2">1H</th>
                <th className="hidden px-1 py-2 md:table-cell">24H</th>
                <th className="hidden px-1 py-2 lg:table-cell">7D</th>
                {/* <th className="hidden p-1 lg:table-cell">total volume</th>
                <th className="hidden p-1 lg:table-cell">market cap ch</th> */}
              </tr>
            </thead>
            <tbody>
              {cryptoData?.map((data) => {
                return (
                  <TableRow data={data} key={data.id} currency={currency} />
                );
              })}
            </tbody>
          </table>
        ) : (
          error.data &&
          error.search && (
            <h1 className="flex min-h-[60vh] items-center justify-center text-lg text-red-600">
              {error.data
                ? error.data
                : error.search
                  ? error.search
                  : "Something unexpected happened!"}
              {/* Here we have use multi chain conditions using ternary operator/ this is not
              covered-text-red-600 in the video but for the example and some improvements */}
            </h1>
          )
        )}
      </div>
    </>
  );
};

export default TableComponent;

const TableRow = ({ data, currency }) => {
  const {
    price_change_percentage_1h_in_currency: pc1H,
    price_change_percentage_24h_in_currency: pc24H,
    price_change_percentage_7d_in_currency: pc7d,
  } = data;
  return (
    <tr
      key={data.id}
      className="border-b-2 border-gray-200 border-opacity-100 text-center text-base text-sm hover:bg-gray-200 dark:border-[var(--color-background)] dark:border-opacity-15 dark:text-gray-100 dark:hover:bg-blue-600 dark:hover:bg-opacity-25 dark:hover:text-blue-600"
    >
      <td className="ml-5 flex justify-start py-2">
        <img
          className="mx-1.5 h-[1.2rem] w-[1.2rem]"
          src={data.image}
          alt={data.name}
        />
        <span className="cursor-pointer">
          <LinKButton
            to={`/app/crypto/${data.id}`}
            name={String(data.symbol).toUpperCase()}
          />{" "}
        </span>
      </td>
      <td className="py-2">
        <span className="cursor-pointer">
          <LinKButton to={`/app/crypto/${data.id}`} name={data.name} />{" "}
        </span>
      </td>
      <td className="py-2">{formatCurrency(data.current_price, currency)}</td>
      <PriceChange pc={pc1H} />
      <PriceChange pc={pc24H} addons=" hidden md:table-cell" />
      <PriceChange pc={pc7d} addons=" hidden lg:table-cell" />

      {/* <td className="px-1 py-2">{data.total_volume}</td>
      <td className="px-1 py-2">{data.market_cap_change_percentage_24h} %</td> */}
    </tr>
  );
};

function LinKButton({ to, name }) {
  return <Link to={to}>{name}</Link>;
}

function PriceChange({ pc, addons = "" }) {
  const styleClasses = pc > 0 ? " text-green-500" : " text-red-600";
  return (
    <td className={`py-2 ${styleClasses} ${addons}`}>
      {pc > 0 ? (
        <span className="text-xs">▲</span>
      ) : (
        <span className="text-xs">▼</span>
      )}{" "}
      {Number(Math.abs(pc)).toFixed(2)}%
    </td>
  );
}
