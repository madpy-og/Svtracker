import LineChart from "./LineChart";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

type Props = {
  incomeByMonth: { _id: { year: number; month: number }; total: number }[];
  expenseByMonth: { _id: { year: number; month: number }; total: number }[];
};

const IncomeExpenseLineChart = ({ incomeByMonth, expenseByMonth }: Props) => {
  const labels = incomeByMonth.map(
    (d) => `${MONTHS[d._id.month - 1]} ${d._id.year}`
  );

  const datasets = [
    {
      label: "Income",
      data: incomeByMonth.map((d) => d.total),
      borderColor: "#04b34f",
      backgroundColor: "rgba(4, 179, 79, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Expense",
      data: expenseByMonth.map((d) => d.total),
      borderColor: "#a6192e",
      backgroundColor: "rgba(166, 25, 46, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ];

  return (
    <LineChart
      title="Income vs Expense (12 Bulan Terakhir)"
      labels={labels}
      datasets={datasets}
      showLegend={true}
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

export default IncomeExpenseLineChart;
