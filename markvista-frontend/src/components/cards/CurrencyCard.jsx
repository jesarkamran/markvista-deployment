function CurrencyCard({ coinName, coinCode, coinIcon, price }) {
  return (
    <div className="col-span-full mt-4 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 pr-8 shadow-lg sm:col-span-6 xl:col-span-4 dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
      <div className="px-1 pt-1">
        <div className="mb-2 flex items-start">
          {/* Icon */}
          <img
            className="mx-4"
            src={coinIcon}
            width="32"
            height="32"
            alt="Icon 01"
          />
          <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
            {coinName}
            <span className="mx-2 text-sm font-medium text-gray-500 dark:text-gray-300">
              {coinCode}
            </span>
          </h2>
        </div>
        <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
          Rates
        </div>
        <div className="flex items-start">
          <div className="ml-10 mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
            ${price}
          </div>
          <div className="rounded-full bg-emerald-500 px-1.5 text-sm font-semibold text-white">
            +49%
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const fetchCoinData = async (
//   coinCode,
//   setPrice,
//   setIsLoading,
//   setPercentageChange,
//   setIsPositive,
// ) => {
//   const apiKey =
//     "2bca1f183229cac73a0a69b86b0f27b5aad7958bbf1459aca0dd7afe3620ef83"; // Replace with your API key
//   const url = `https://min-api.cryptocompare.com/data/price?fsym=${coinCode}&tsyms=USD&apiKey=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data.USD) {
//       setPrice(data.USD);
//       setIsLoading(false);
//       // Implement logic for percentage change (if available from API)
//       setPercentageChange(5); // Example: Replace with real percentage change if available
//       setIsPositive(true); // Example: Replace with real data if available
//     }
//   } catch (error) {
//     console.error("Error fetching coin data:", error);
//     setIsLoading(false);
//   }
// };

// function CurrencyCard({ coinName, coinCode, coinIcon }) {
//   const [price, setPrice] = useState(null);
//   const [percentageChange, setPercentageChange] = useState(null);
//   const [isPositive, setIsPositive] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchCoinData(
//       coinCode,
//       setPrice,
//       setIsLoading,
//       setPercentageChange,
//       setIsPositive,
//     );
//   }, [coinCode]); // Only run when coinCode changes

//   return (
//     <div className="col-span-full mt-4 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 pr-8 shadow-lg sm:col-span-6 xl:col-span-4 dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
//       <div className="px-1 pt-1">
//         <div className="mb-2 flex items-start">
//           {/* Icon */}
//           <img
//             className="mx-4"
//             src={coinIcon}
//             width="32"
//             height="32"
//             alt="Coin Icon"
//           />
//           <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
//             {coinName}
//             <span className="mx-2 text-sm font-medium text-gray-500 dark:text-gray-300">
//               {coinCode.toUpperCase()}
//             </span>
//           </h2>
//         </div>
//         <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
//           Rates
//         </div>
//         <div className="flex items-start">
//           <div className="ml-10 mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
//             ${!isLoading ? price : "..."}
//           </div>
//           {percentageChange !== null && (
//             <div
//               className={`rounded-full px-1.5 text-sm font-semibold text-white ${
//                 isPositive ? "bg-emerald-500" : "bg-red-500"
//               }`}
//             >
//               {isPositive ? "+" : ""}
//               {percentageChange}%
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CurrencyCard;
