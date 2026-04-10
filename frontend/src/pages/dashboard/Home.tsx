import Card from "../../components/ui/Card";
import { formatRupiah } from "../../utils/formatRupiah";
import RecentTransactions from "../../components/ui/list/RecentTransactions";
import { useDashboard } from "../../hooks/useDashboard";

const Home = () => {
  const { dashboard } = useDashboard();

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-2 min-[600px]:grid-cols-2 min-[950px]:grid-cols-4 gap-2.5">
        <Card className="h-26 md:h-32.5">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Total Balance
          </p>
          <p className="text-h5-m md:text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalBalance)}
          </p>
        </Card>
        <Card className="h-26 md:h-32.5">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Total Income
          </p>
          <p className="text-h5-m md:text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalIncomes)}
          </p>
        </Card>
        <Card className="h-26 md:h-32.5">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Total Expense
          </p>
          <p className="text-h5-m md:text-h5 text-cusblack font-bold">
            {formatRupiah(dashboard?.totalExpenses)}
          </p>
        </Card>

        <Card className="h-26 md:h-32.5">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Percentage
          </p>
          <p className="text-h5-m md:text-h5 text-cusblack font-bold">20%</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 min-[950px]:grid-cols-4 grid-row-2 gap-2.5">
        <Card className="flex flex-col md:col-span-2 md:row-span-2 h-105 gap-2 overflow-hidden">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Recent Transactions
          </p>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            <RecentTransactions
              transactions={dashboard?.recentTransactions ?? []}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
