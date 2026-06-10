import LineChart from "./LineChart";

type Props = {
  dailyIncome: { _id: { year: number; month: number; day: number }; total: number }[];
};

const DailyIncomeChart = ({ dailyIncome }: Props) => {
  const labels = dailyIncome.map((d) => `${d._id.day}/${d._id.month}`);
  const datasets = [
    {
      label: "Income Harian",
      data: dailyIncome.map((d) => d.total),
      borderColor: "#04b34f",
      backgroundColor: "rgba(4, 179, 79, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ];

  return (
    <LineChart
      title="Tren Income Harian"
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

export default DailyIncomeChart;
