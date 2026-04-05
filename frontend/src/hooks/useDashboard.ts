import { getDashboard } from "../api/dashboardApi";
import { type DashboardSchema } from "../schemas/dashboardSchema";
import { useState, useEffect } from "react";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardSchema | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await getDashboard();

      if (!data) {
        console.log("Something went wrong");
        return;
      }

      setDashboard(data);
    };

    fetchDashboardData();
  }, []);

  return { dashboard };
};
