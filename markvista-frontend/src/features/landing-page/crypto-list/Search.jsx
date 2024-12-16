import { useState } from "react";
import useCryptoContext from "../../../stores/crypto-context/useCryptoContext";
import { FaSearch } from "react-icons/fa";
import useDebounce from "./useDebounce";
import Spinner from "../../../components/Spinner";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useCryptoContext();

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
      <form className="w-50 flex items-center sm:ml-7" onSubmit={handleSubmit}>
        <div className="flex h-7 w-72 items-center justify-center rounded border border-blue-400 border-transparent bg-gray-100 text-blue-700 outline-0 sm:h-9 sm:w-full sm:px-1 sm:pl-2 dark:bg-gray-300">
          <input
            type="text"
            name="search"
            onChange={handleInput}
            value={searchText}
            className="border-none bg-transparent outline-none focus:border-transparent focus:ring-0"
            required
            placeholder="search here..."
          />
          <button type="submit">
            <FaSearch className="text-xl" />
          </button>
        </div>
      </form>
      {searchText.length > 0 && (
        <SearchListPopup searchData={searchData} selectCoin={selectCoin} />
      )}
    </>
  );
};

const Search = () => {
  let { getSearchResult } = useCryptoContext();

  const hanlder = useDebounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div>
      <SearchInput handleSearch={hanlder} />
    </div>
  );
};

export default Search;

function SearchListPopup({ searchData, selectCoin }) {
  return (
    <ul className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 absolute ml-1 mt-2 h-96 w-80 overflow-x-hidden rounded bg-opacity-60 py-2 backdrop-blur-md dark:bg-gray-600 dark:text-gray-100">
      {searchData ? (
        searchData.map((coin) => {
          return (
            <li
              className="my-2 ml-4 flex cursor-pointer items-center"
              key={coin.id}
              onClick={() => selectCoin(coin.id)}
            >
              <img
                className="mx-1.5 h-[1rem] w-[1rem]"
                src={coin.thumb}
                alt={coin.name}
              />

              <span>{coin.name}</span>
            </li>
          );
        })
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner name="searching..." />
        </div>
      )}
    </ul>
  );
}
