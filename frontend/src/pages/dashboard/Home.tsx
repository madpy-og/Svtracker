import React, { useEffect, useState } from "react";
import {
  dashboardSchema,
  type DashboardSchema,
} from "../../schemas/dashboardSchema";
import Card from "../../components/ui/Card";
import { getDashboard } from "../../api/dashboardApi";
import { formatRupiah } from "../../utils/formatRupiah";
import RecentTransactions from "../../components/ui/RecentTransactions";

const Home = () => {
  const [dashboard, setDashboard] = useState<DashboardSchema | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await getDashboard();

      if (!data) {
        console.log("Something went wrong");
      }

      setDashboard(data);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-4 gap-2.5">
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Total Income</p>
          <p className="text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalIncomes)}
          </p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Expense Total</p>
          <p className="text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalExpenses)}
          </p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">My Wallet</p>
          <p className="text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalBalance)}
          </p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Percentage</p>
          <p className="text-h5 text-cusblack font-bold">20%</p>
        </Card>
      </div>
      <div className="grid grid-cols-4 grid-row-2 gap-2.5">
        <Card className="col-span-2 row-span-2 h-105">
          <p className="text-bd text-cusblack font-semibold">
            Recent Incomes/Expenses
          </p>
          <div className="flex flex-col gap-2 p-2">
            <RecentTransactions
              transactions={dashboard?.recentTransactions ?? []}
            />
          </div>
        </Card>
        <Card className="col-span-1 row-span-2">
          <div></div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
