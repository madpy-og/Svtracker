import React, { useMemo } from "react";
import Card from "../../components/ui/Card";
import ListIncome from "../../components/ui/ListIncome";
import { AddButton } from "../../components/ui/Button";
import { useGetIncomes } from "../../hooks/useIncome";
import { useGetMonthlySummary } from "../../hooks/useDashboard";
import IncomeMonthlyBarChart from "../../components/charts/IncomeMonthlyBarChart";
import { formatRupiah } from "../../utils/formatRupiah";

const Income = () => {
  const { data: income = [] } = useGetIncomes();
  const { data: monthlySummary } = useGetMonthlySummary();

  const averageIncome = useMemo(() => {
    const data = monthlySummary?.incomeByMonth || [];
    const filteredData = data.filter(curr => curr.total > 0);
    if (filteredData.length === 0) return 0;
    const total = filteredData.reduce((acc, curr) => acc + curr.total, 0);
    return total / filteredData.length;
  }, [monthlySummary]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 h-60 gap-3">
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-bd-m md:text-bd text-cusblack font-semibold">
              Income Per Month
            </p>
            <p className="text-bs-m md:text-bs text-cusdarkgrey font-medium">
              Avg: {formatRupiah(averageIncome)} / month
            </p>
          </div>
          <IncomeMonthlyBarChart incomeByMonth={monthlySummary?.incomeByMonth || []} />
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-3">
        <Card className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-bd-m md:text-bd text-cusblack font-semibold">
              Income Source
            </p>
            <AddButton variant="addIncome" />
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-1 md:gap-2">
            <ListIncome datas={income} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Income;
