import LineChart from "./LineChart";

type Props = {
  dailyExpense: { _id: { year: number; month: number; day: number }; total: number }[];
};

const DailyExpenseChart = ({ dailyExpense }: Props) => {
  const labels = dailyExpense.map((d) => `${d._id.day}/${d._id.month}`);
  const datasets = [
    {
      label: "Expense Harian",
      data: dailyExpense.map((d) => d.total),
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ];

  return (
    <LineChart
      title="Tren Expense Harian"
      labels={labels}
      datasets={datasets}
      yAxisFormatter={(value) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          notation: "compact",
        }).format(value)
      }
    />
  );
};

export default DailyExpenseChart;
