import { useState, useEffect } from "react";
import { getAllIncome } from "../api/incomeApi";
import type { IncomeSchema } from "../schemas/incomeSchema";

export const useIncome = async () => {
  const [income, setIncome] = useState<IncomeSchema | null>(null);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const data = await getAllIncome();

        if (!data) {
          console.log("Something went wrong");
        }

        setIncome(data);
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchIncomeData();
  }, []);

  return { income };
};
