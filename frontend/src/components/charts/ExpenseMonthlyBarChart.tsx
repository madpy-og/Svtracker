import BarChart from "./BarChart";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

type Props = {
  expenseByMonth: { _id: { year: number; month: number }; total: number }[];
};

const ExpenseMonthlyBarChart = ({ expenseByMonth }: Props) => {
  const labels = expenseByMonth.map((d) => `${MONTHS[d._id.month - 1]} ${d._id.year}`);
  const datasets = [
    {
      label: "Total Expense",
      data: expenseByMonth.map((d) => d.total),
      backgroundColor: "rgba(252, 57, 22, 0.8)",
      borderColor: "#fc3916",
      borderWidth: 1,
      borderRadius: 6,
    },
  ];

  return (
    <BarChart
      labels={labels}
      datasets={datasets}
      yAxisFormatter={(value) => {
        if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
        if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)}rb`;
        return `Rp ${value}`;
      }}
    />
  );
};

export default ExpenseMonthlyBarChart;
