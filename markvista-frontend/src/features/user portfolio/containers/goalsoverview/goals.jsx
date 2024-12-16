import { useEffect, useState } from "react";
import Card from "./goalcard/card"; // Import the Card component
import "./goals.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Goals = () => {
  const [goals, setGoals] = useState([]); // State to store fetched goals
  const [processedGoals, setProcessedGoals] = useState([]); // State to store processed goals
  const [pnlData, setPnlData] = useState([]); // State to store PnL data
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate(); // Get the navigate function

  // Fetch data from the backend
  const fetchGoals = async () => {
    try {
      setError(null); // Reset error state
      const response = await fetch("http://localhost:4000/api/goal/goals");
      if (!response.ok) {
        throw new Error("Failed to fetch goals. Please try again later.");
      }
      const data = await response.json();
      setGoals(data.goals || []); // Use only the "goals" array
    } catch (error) {
      console.error("Error fetching goals:", error);
      setError(error.message);
    }
  };

  // Fetch PnL data from the backend
  const fetchPnLData = async () => {
    try {
      setError(null); // Reset error state
      const pnlResponse = await fetch(
        "http://localhost:4000/api/order/closed-pnl",
      );
      if (!pnlResponse.ok) {
        throw new Error("Failed to fetch PnL data. Please try again later.");
      }
      const pnlResult = await pnlResponse.json();
      setPnlData(pnlResult.trades || []); // Set PnL data
    } catch (error) {
      console.error("Error fetching PnL data:", error);
      setError(error.message);
    }
  };

  // Function to delete a goal
  const deleteGoal = async (goalId) => {
    try {
      setError(null); // Reset error state
      const response = await fetch(
        `http://localhost:4000/api/goal/goals/${goalId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        // Remove the deleted goal from the local state
        setGoals(goals.filter((goal) => goal._id !== goalId));
        alert("Goal deleted successfully");
      } else {
        throw new Error("Error deleting goal. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      setError(error.message);
      alert(error.message);
    }
  };

  // Function to calculate total profit for each goal type (Daily, Weekly, etc.)
  const calculateTotalProfit = (goal, pnlData) => {
    let totalProfit = 0;
    const goalCreationDate = new Date(goal.setAt); // Goal creation time from the API

    pnlData.forEach((trade) => {
      const tradeDate = new Date(parseInt(trade.updatedTime));
      const pnl = parseFloat(trade.closedPnl) || 0;

      if (tradeDate >= goalCreationDate) {
        if (goal.goalType === "Daily" && isSameDay(new Date(), tradeDate)) {
          totalProfit += pnl;
        } else if (
          goal.goalType === "Weekly" &&
          isSameWeek(new Date(), tradeDate)
        ) {
          totalProfit += pnl;
        } else if (
          goal.goalType === "Monthly" &&
          isSameMonth(new Date(), tradeDate)
        ) {
          totalProfit += pnl;
        } else if (
          goal.goalType === "Quarterly" &&
          isSameQuarter(new Date(), tradeDate)
        ) {
          totalProfit += pnl;
        } else if (
          goal.goalType === "Yearly" &&
          isSameYear(new Date(), tradeDate)
        ) {
          totalProfit += pnl;
        }
      }
    });

    return totalProfit;
  };

  // Helper functions to check if two dates are the same (Day, Week, Month, Year)
  const isSameDay = (date1, date2) =>
    date1.toDateString() === date2.toDateString();
  const isSameWeek = (date1, date2) => {
    const startOfWeek = date1.getDate() - date1.getDay();
    const endOfWeek = startOfWeek + 6;
    const startOfDate2 = date2.getDate() - date2.getDay();
    return startOfWeek <= startOfDate2 && endOfWeek >= startOfDate2;
  };
  const isSameMonth = (date1, date2) =>
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
  const isSameQuarter = (date1, date2) => {
    const quarter1 = Math.floor(date1.getMonth() / 3);
    const quarter2 = Math.floor(date2.getMonth() / 3);
    return quarter1 === quarter2 && date1.getFullYear() === date2.getFullYear();
  };
  const isSameYear = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear();

  // Process the goals to adjust for profit/loss
  const processGoals = () => {
    const processed = goals.flatMap((goal) => {
      const smallerGoals = [];

      smallerGoals.push({ ...goal, setAt: goal.setAt });

      if (goal.goalType === "Yearly") {
        smallerGoals.push(
          {
            goalType: "Quarterly",
            goalAmount: goal.goalAmount / 4,
            setAt: goal.setAt,
          },
          {
            goalType: "Monthly",
            goalAmount: goal.goalAmount / 12,
            setAt: goal.setAt,
          },
          {
            goalType: "Weekly",
            goalAmount: goal.goalAmount / 52,
            setAt: goal.setAt,
          },
          {
            goalType: "Daily",
            goalAmount: goal.goalAmount / 365,
            setAt: goal.setAt,
          },
        );
      } else if (goal.goalType === "Quarterly") {
        smallerGoals.push(
          {
            goalType: "Monthly",
            goalAmount: goal.goalAmount / 3,
            setAt: goal.setAt,
          },
          {
            goalType: "Weekly",
            goalAmount: goal.goalAmount / 13,
            setAt: goal.setAt,
          },
          {
            goalType: "Daily",
            goalAmount: goal.goalAmount / 91,
            setAt: goal.setAt,
          },
        );
      } else if (goal.goalType === "Monthly") {
        smallerGoals.push(
          {
            goalType: "Weekly",
            goalAmount: goal.goalAmount / 4,
            setAt: goal.setAt,
          },
          {
            goalType: "Daily",
            goalAmount: goal.goalAmount / 30,
            setAt: goal.setAt,
          },
        );
      } else if (goal.goalType === "Weekly") {
        smallerGoals.push({
          goalType: "Daily",
          goalAmount: goal.goalAmount / 7,
          setAt: goal.setAt,
        });
      }

      return smallerGoals.map((smallerGoal) => {
        const totalProfit = calculateTotalProfit(smallerGoal, pnlData);
        const adjustedGoalAmount = smallerGoal.goalAmount - totalProfit;
        const goalPercentage = (totalProfit / smallerGoal.goalAmount) * 100;

        return {
          ...smallerGoal,
          totalProfit,
          goalPercentage,
          adjustedGoalAmount,
        };
      });
    });

    setProcessedGoals(processed);
  };

  // Fetch goals and PnL data on component mount
  useEffect(() => {
    fetchGoals();
    fetchPnLData();
  }, []);

  // Recalculate processed goals when either goals or PnL data changes
  useEffect(() => {
    if (goals.length > 0 && pnlData.length > 0) {
      processGoals();
    }
  }, [goals, pnlData]);

  // Navigate to 'setgoals' page
  const navigateToSetGoals = () => {
    navigate("/app/setgoals");
  };

  return (
    <div>
      {processedGoals.length > 0 ? (
        <div>
          <div className="goals-container">
            {processedGoals.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </div>
          <div className="goal-actions">
            <button
              className="form-button"
              onClick={() => deleteGoal(processedGoals[0]._id)}
            >
              Delete Goal
            </button>
          </div>
        </div>
      ) : (
        <div className="no-goals-message">
          <p>Set your goals to track your progress</p>
          <button className="form-button" onClick={navigateToSetGoals}>
            Set Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default Goals;

// import useGoals from "./useGoals"; // Import the custom hook
// import Card from "./goalcard/card"; // Ensure you have the Card component
// import { useEffect } from "react";

// const GoalsComponent = ({ navigateToSetGoals }) => {
//   const {
//     processedGoals,
//     deleteGoal,
//     fetchGoals, // Optional: To refresh goals if needed
//     error,
//   } = useGoals();

//   // Save goals to local storage
//   useEffect(() => {
//     if (processedGoals.length > 0) {
//       localStorage.setItem("goalsBackup", JSON.stringify(processedGoals));
//     }
//   }, [processedGoals]);

//   // Retrieve goals from local storage if none are available
//   const getGoalsFromLocalStorage = () => {
//     // const storedGoals = localStorage.getItem("goalsBackup");
//     // return storedGoals ? JSON.parse(storedGoals) : [];
//   };

//   const backupGoals =
//     processedGoals?.length === 0 ? getGoalsFromLocalStorage() : processedGoals;

//   return (
//     <div>
//       {error && <p className="error">{error}</p>}
//       {backupGoals?.length > 0 ? (
//         <div>
//           <div className="goals-container">
//             {backupGoals.map((data, index) => (
//               <Card key={index} {...data} />
//             ))}
//           </div>
//           <div className="goal-actions">
//             <button
//               className="form-button"
//               onClick={() => deleteGoal(backupGoals[0]._id)}
//             >
//               Delete Goal
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="no-goals-message">
//           <p>Set your goals to track your progress</p>
//           <button className="form-button" onClick={navigateToSetGoals}>
//             Set Goal
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoalsComponent;
