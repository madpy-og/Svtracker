import BarChart from "./BarChart";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

type Props = {
  incomeByMonth: { _id: { year: number; month: number }; total: number }[];
};

const IncomeMonthlyBarChart = ({ incomeByMonth }: Props) => {
  const labels = incomeByMonth.map((d) => MONTHS[d._id.month - 1]);
  const datasets = [
    {
      label: "Total Income",
      data: incomeByMonth.map((d) => d.total),
      backgroundColor: "rgba(4, 179, 79, 0.8)",
      borderColor: "#04b34f",
      borderWidth: 1,
      borderRadius: 6,
    },
  ];

  return (
    <BarChart
      title="Income per Bulan"
      labels={labels}
      datasets={datasets}
      yAxisFormatter={(value) => `Rp ${(value / 1_000_000).toFixed(1)}jt`}
    />
  );
};

export default IncomeMonthlyBarChart;
