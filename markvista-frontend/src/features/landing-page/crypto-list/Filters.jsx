import useCryptoContext from "@src/stores/crypto-context/useCryptoContext";
import { useRef } from "react";
import { BiReset } from "react-icons/bi";
import { MdOutlineChangeCircle } from "react-icons/md";
import Search from "./Search";

const Filters = () => {
  let { setCurrency, setSortBy, resetFunction } = useCryptoContext();
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="flex h-auto flex-col items-center justify-between rounded-md border border-gray-300 bg-white p-2 placeholder:text-gray-400 dark:border-[var(--color-background)] dark:border-opacity-25 dark:bg-[var(--color-section)] dark:placeholder:text-gray-100">
      <Search />
      <div className="mt-2 flex justify-center sm:space-x-4 md:space-x-8">
        <form className="flex items-center" onSubmit={handleCurrencySubmit}>
          <label
            htmlFor="currency"
            className="mr-2 flex items-center justify-center font-bold"
          >
            curr
            <span className="hidden sm:block">ency</span>:{" "}
          </label>
          <input
            type="text"
            name="currency"
            ref={currencyRef}
            placeholder="usd"
            className="h-6 w-12 rounded border border-blue-400 bg-gray-100 leading-4 text-blue-600 outline-none focus:border-blue-400 sm:h-8 sm:w-16 sm:pl-2 dark:bg-gray-300"
            required
          />
          <button type="submit" className="ml-1 cursor-pointer">
            {/* <img src={submitIcon} alt="submit" className="h-4 w-4" /> */}
            <MdOutlineChangeCircle className="text-xl md:text-2xl" />
          </button>
        </form>

        <SortCurrencies handleSort={handleSort} />
        <button className="ml-4 transform" onClick={resetFunction}>
          <BiReset className="text-3xl text-blue-700 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

function SortCurrencies({ handleSort }) {
  return (
    <div className="flex items-center justify-center">
      <span className="mr-1 w-max font-bold md:mr-2">sort: </span>
      <span className="mr-1 hidden font-bold sm:block md:mr-2"> by: </span>
      <select
        name="sortby"
        className="h-6 w-16 rounded border-blue-400 bg-gray-100 p-1 text-center text-base text-sm capitalize leading-4 focus:border-blue-400 focus:outline-0 sm:h-7 sm:w-28 md:h-8 md:w-36 md:pr-10 dark:bg-gray-300 dark:text-gray-600"
        onClick={handleSort}
      >
        <option value="market_cap_desc">market cap desc</option>
        <option value="market_cap_asc">market cap asc</option>
        <option value="volume_desc">volume desc</option>
        <option value="volume_asc">volume asc</option>
        <option value="gecko_desc">gecko desc</option>
        <option value="gecko_asc">gecko asc</option>
        <option value="price_desc">price desc</option>
        <option value="price_asc">price asc</option>
        <option value="id_desc">id desc</option>
        <option value="id_asc">id asc</option>
      </select>
    </div>
  );
}

export default Filters;
