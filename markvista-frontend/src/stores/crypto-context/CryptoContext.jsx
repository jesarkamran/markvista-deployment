/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useState } from "react";
import extractIds from "../../utils/extractIds";

// create context object
export const CryptoContext = createContext({});

const totalPages = 800;
// create the provider component
const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [dataOverview, setDataOverview] = useState({});
  const labelsOverview = ["bitcoin", "etherum", "tether", "bnbcoin"];

  const [coinSearch, setCoinSearch] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [error, setError] = useState({ data: "", coinData: "", search: "" });

  const getSearchResult = async (query) => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
      );

      if (data?.coins?.length > 0) {
        // console.log(extractIds(data.coins));
        setSearchData(data.coins);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        coinSearch,
        resetFunction,
        error,
        getSearchResult,
        setCryptoData,
        dataOverview,
        setDataOverview,
        labelsOverview,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
