// import { useRef } from "react";
// import submitIcon from "../../../assets/images/submit-icon.svg";
import useCryptoContext from "../../../stores/crypto-context/useCryptoContext";

const Pagination = () => {
  let { page, setPage, totalPages, perPage } = useCryptoContext();
  // cryptoData
  // console.log({ page, setPage, totalPages, perPage, cryptoData });

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(1); // Go to the first page if going back 3 steps would be less than or equal to 1
    } else {
      setPage(page - 3); // Otherwise, move 3 steps back
    }
  };

  // cryptoData && cryptoData.length >=
  if (perPage) {
    return (
      <div className="flex items-end rounded-md border border-gray-300 bg-gray-50 p-3 dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
        {/* <PerPage /> */}
        <ul className="flex items-center justify-end text-sm">
          {page > 1 && (
            <ListItemButton
              handler={prev}
              content="prev"
              addons="bg-blue-500 h-8 w-14 text-blue-50 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
            />
          )}

          {page > 3 && <ListItemButton content="..." handler={multiStepPrev} />}

          {page - 1 !== 0 && (
            <ListItemButton content={page - 1} handler={prev} />
          )}
          <ListItemButton
            content={page}
            addons="text-blue-50 h-8 w-8 bg-blue-700"
            disabled={true}
          />

          {page + 1 !== TotalNumber && page !== TotalNumber && (
            <ListItemButton content={page + 1} handler={next} />
          )}

          {page < TotalNumber - 3 && (
            <ListItemButton content="..." handler={multiStepNext} />
          )}

          {page !== TotalNumber && (
            <ListItemButton
              content={TotalNumber}
              handler={() => setPage(TotalNumber)}
            />
          )}
          {page < TotalNumber && (
            <ListItemButton
              handler={next}
              content="next"
              addons="bg-blue-500 h-8 w-14 text-blue-50 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
            />
          )}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;

const ListItemButton = ({
  addons = "text-blue-700 dark:text-blue-300 h-8 w-8 hover:bg-blue-700 hover:text-blue-50",
  content,
  handler = () => {},
  disabled = false,
}) => {
  // Combine common classes with any additional classes
  const className =
    "mx-1.5 flex  items-center justify-center rounded-md text-lg ";
  return (
    <li>
      <button
        disabled={disabled}
        className={`${className} ${addons}`}
        onClick={handler}
      >
        {" "}
        {content}{" "}
      </button>
    </li>
  );
};

/*

const PerPage = () => {
  const { setPerPage } = useCryptoContext();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="font-nunito relative mr-12 flex items-center"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative mr-2 flex items-center justify-center font-bold"
      >
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="10"
        className="required focus:border-cyan w-16 rounded border border-transparent bg-white pl-2 leading-4 outline-0 placeholder:text-gray-400"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="h-auto w-full" />
      </button>
    </form>
  );
};

*/
