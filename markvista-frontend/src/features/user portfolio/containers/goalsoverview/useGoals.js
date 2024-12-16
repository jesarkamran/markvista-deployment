import { useState, useEffect } from "react";

const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [processedGoals, setProcessedGoals] = useState([]);
  const [pnlData, setPnlData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch goals from the backend
  const fetchGoals = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:4000/api/goal/goals");
      if (!response.ok) {
        throw new Error("Failed to fetch goals. Please try again later.");
      }
      const data = await response.json();
      setGoals(data.goals || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
      setError(err.message);
    }
  };

  // Fetch PnL data from the backend
  const fetchPnLData = async () => {
    try {
      setError(null);
      const response = await fetch(
        "http://localhost:4000/api/order/closed-pnl",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PnL data. Please try again later.");
      }
      const result = await response.json();
      setPnlData(result.trades || []);
    } catch (err) {
      console.error("Error fetching PnL data:", err);
      setError(err.message);
    }
  };

  // Delete a goal
  const deleteGoal = async (goalId) => {
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:4000/api/goal/goals/${goalId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setGoals((prevGoals) =>
          prevGoals.filter((goal) => goal._id !== goalId),
        );
        alert("Goal deleted successfully");
      } else {
        throw new Error("Error deleting goal. Please try again later.");
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
      setError(err.message);
      alert(err.message);
    }
  };

  // Calculate total profit for a goal
  const calculateTotalProfit = (goal) => {
    let totalProfit = 0;
    const goalCreationDate = new Date(goal.setAt);

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

  // Helper functions for date comparison
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

  // Fetch goals and PnL data on mount
  useEffect(() => {
    fetchGoals();
    fetchPnLData();
  }, []);

  return {
    goals,
    processedGoals,
    pnlData,
    error,
    fetchGoals,
    fetchPnLData,
    deleteGoal,
    calculateTotalProfit,
  };
};

export default useGoals;
