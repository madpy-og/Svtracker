import BarChart from "./BarChart";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

type Props = {
  expenseByMonth: { _id: { year: number; month: number }; total: number }[];
};

const ExpenseMonthlyBarChart = ({ expenseByMonth }: Props) => {
  const labels = expenseByMonth.map((d) => MONTHS[d._id.month - 1]);
  const datasets = [
    {
      label: "Total Expense",
      data: expenseByMonth.map((d) => d.total),
      backgroundColor: "rgba(166, 25, 46, 0.8)",
      borderColor: "#a6192e",
      borderWidth: 1,
      borderRadius: 6,
    },
  ];

  return (
    <BarChart
      title="Expense per Bulan"
      labels={labels}
      datasets={datasets}
      yAxisFormatter={(value) => `Rp ${(value / 1_000_000).toFixed(1)}jt`}
    />
  );
};

export default ExpenseMonthlyBarChart;
