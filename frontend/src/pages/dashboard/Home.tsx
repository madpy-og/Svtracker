import Card from "../../components/ui/Card";
import { formatRupiah } from "../../utils/formatRupiah";
import ListRecentTransactions from "../../components/ui/ListRecentTransactions";
import { useGetDashboard } from "../../hooks/useDashboard";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import SkeletonList from "../../components/skeleton/SkeletonList";
import Skeleton from "react-loading-skeleton";
import DistributionDonutChart from "../../components/charts/DistributionDonutChart";

const HomeSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 min-[600px]:grid-cols-2 min-[950px]:grid-cols-4 gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="grid grid-cols-1 min-[950px]:grid-cols-4 gap-3 items-start">
        <Card className="flex flex-col min-[950px]:col-span-2 h-fit gap-2">
          <Skeleton width={150} height={20} className="mb-2" />
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            <SkeletonList count={7} />
          </div>
        </Card>
      </div>
    </div>
  );
};

const Home = () => {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading) return <HomeSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 min-[600px]:grid-cols-2 min-[950px]:grid-cols-4 gap-3">
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
      <div className="grid grid-cols-1 min-[950px]:grid-cols-4 gap-3 items-start">
        <Card className="flex flex-col min-[950px]:col-span-2 h-fit gap-2">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Recent Transactions
          </p>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            <ListRecentTransactions
              transactions={dashboard?.recentTransactions ?? []}
            />
          </div>
        </Card>
        <Card className="flex flex-col min-[950px]:col-span-2 h-fit gap-2">
          <DistributionDonutChart />
        </Card>
      </div>
    </div>
  );
};

export default Home;
