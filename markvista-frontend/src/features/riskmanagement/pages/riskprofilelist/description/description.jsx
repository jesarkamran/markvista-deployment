// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./description.css"; // Ensure you have a CSS file for styling

// const Description = () => {
//   const { id } = useParams(); // Get the risk profile ID from the URL
//   const [riskProfile, setRiskProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRiskProfile = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/riskprofiles/${id}`,
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setRiskProfile(data);
//       } catch (error) {
//         console.error("Error fetching risk profile:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRiskProfile();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!riskProfile) {
//     return <div>No risk profile found</div>;
//   }

//   return (
//     <div className={"app__wrapper main"}>
//       <p className="small__heading">{riskProfile.title}</p>
//       <p className={"p__basic"}>
//         {riskProfile.description || "No description available"}
//       </p>
//       <ul className={"risk-profile-details p__basic"}>
//         <li>
//           <strong>Initial Risk Per Trade:</strong>{" "}
//           {riskProfile.initialRiskPerTrade}
//         </li>
//         <li>
//           <strong>SL Allowed Per Day:</strong> {riskProfile.SLallowedperday}
//         </li>
//         <li>
//           <strong>Increase on Win:</strong> {riskProfile.increaseOnWin}
//         </li>
//         <li>
//           <strong>Decrease on Loss:</strong> {riskProfile.decreaseOnLoss}
//         </li>
//         <li>
//           <strong>Max Risk:</strong> {riskProfile.maxRisk}
//         </li>
//         <li>
//           <strong>Min Risk:</strong> {riskProfile.minRisk}
//         </li>
//         <li>
//           <strong>Min Risk to Reward Ratio:</strong>{" "}
//           {riskProfile.minRiskRewardRatio}
//         </li>{" "}
//         {/* Updated line */}
//         <li>
//           <strong>Reset:</strong> {riskProfile.reset}
//         </li>
//         <li>
//           <strong>Growth Threshold:</strong> {riskProfile.growthThreshold}
//         </li>
//         <li>
//           <strong>Payout Percentage:</strong> {riskProfile.payoutPercentage}
//         </li>
//         <li>
//           <strong>Created At:</strong>{" "}
//           {new Date(riskProfile.createdAt).toLocaleDateString()}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Description;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSpinner, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import "./description.css"; // Ensure you have a CSS file for styling
import {
  LucideAlertCircle,
  LucideArrowDown,
  LucideArrowUp,
  LucideBarChart,
  LucideCalendar,
  LucideChartLine,
  LucideDollarSign,
  LucideGitCompareArrows,
  LucidePercent,
  LucideRefreshCw,
  LucideScale,
} from "lucide-react";
import BackButton from "@components/BackButton";

const Description = () => {
  const { id } = useParams(); // Get the risk profile ID from the URL
  const [riskProfile, setRiskProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiskProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/riskprofiles/${id}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRiskProfile(data);
      } catch (error) {
        console.error("Error fetching risk profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-red-500">
        <FaExclamationCircle className="mb-4 text-6xl" />
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!riskProfile) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-gray-500">
        <FaInfoCircle className="mb-4 text-6xl" />
        <p className="text-lg">No risk profile found</p>
      </div>
    );
  }

  return (
    <div className="bg-light mx-auto mt-10 max-w-3xl rounded-md border border-gray-300 p-8 shadow-2xl dark:border-[var(--color-border)] dark:bg-[var(--color-section)]">
      <BackButton />
      <h1 className="futuristic-text mb-6 text-center text-3xl font-extrabold text-gray-800 dark:text-gray-100">
        {riskProfile.title}
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
        {riskProfile.description || "No description available"}
      </p>
      <ul className="space-y-6 text-gray-700 dark:text-gray-200">
        <li className="flex items-center space-x-4 rounded-md border border-blue-500 bg-blue-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-blue-500">
            <LucideChartLine />
          </span>
          <strong>Initial Risk Per Trade:</strong>
          <span>{riskProfile.initialRiskPerTrade}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-red-500 bg-red-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-red-500">
            <LucideAlertCircle />
          </span>
          <strong>SL Allowed Per Day:</strong>
          <span>{riskProfile.SLallowedperday}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-green-500 bg-green-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-green-500">
            <LucideArrowUp />
          </span>
          <strong>Increase on Win:</strong>
          <span>{riskProfile.increaseOnWin}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-yellow-500 bg-yellow-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-yellow-500">
            <LucideArrowDown />
          </span>
          <strong>Decrease on Loss:</strong>
          <span>{riskProfile.decreaseOnLoss}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-purple-500 bg-purple-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-purple-500">
            <LucideScale />
          </span>
          <strong>Max Risk:</strong>
          <span>{riskProfile.maxRisk}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-teal-500 bg-teal-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-teal-500">
            <LucideGitCompareArrows />
          </span>
          <strong>Min Risk:</strong>
          <span>{riskProfile.minRisk}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-orange-500 bg-orange-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-orange-500">
            <LucidePercent />
          </span>
          <strong>Min Risk to Reward Ratio:</strong>
          <span>{riskProfile.minRiskRewardRatio}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-indigo-500 bg-indigo-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-indigo-500">
            <LucideRefreshCw />
          </span>
          <strong>Reset:</strong>
          <span>{riskProfile.reset}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-pink-500 bg-pink-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-pink-500">
            <LucideBarChart />
          </span>
          <strong>Growth Threshold:</strong>
          <span>{riskProfile.growthThreshold}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-cyan-500 bg-cyan-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-cyan-500">
            <LucideDollarSign />
          </span>
          <strong>Payout Percentage:</strong>
          <span>{riskProfile.payoutPercentage}</span>
        </li>
        <li className="flex items-center space-x-4 rounded-md border border-gray-500 bg-gray-50 p-4 dark:bg-[var(--color-card)]">
          <span className="text-gray-500">
            <LucideCalendar />
          </span>
          <strong>Created At:</strong>
          <span>{new Date(riskProfile.createdAt).toLocaleDateString()}</span>
        </li>
      </ul>
    </div>
  );
};

export default Description;
