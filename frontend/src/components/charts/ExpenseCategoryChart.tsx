import DoughnutChart from "./DoughnutChart";

const COLORS = [
  "rgba(252, 57, 22, 1)", "rgba(252, 57, 22, 0.85)",
  "rgba(252, 57, 22, 0.7)", "rgba(252, 57, 22, 0.55)",
  "rgba(252, 57, 22, 0.4)", "rgba(252, 57, 22, 0.25)",
  "rgba(252, 57, 22, 0.15)", "rgba(252, 57, 22, 0.05)",
];

type CategoryData = {
  name: string;
  icon: string;
  total: number;
};

type Props = {
  categories: CategoryData[];
};

const ExpenseCategoryChart = ({ categories }: Props) => {
  const labels = categories.map((c) => `${c.icon} ${c.name}`);
  const datasets = [
    {
      data: categories.map((c) => c.total),
      backgroundColor: COLORS.slice(0, categories.length),
      borderWidth: 2,
      borderColor: "#fff",
      hoverOffset: 8,
    },
  ];

  return (
    <DoughnutChart
      labels={labels}
      datasets={datasets}
      tooltipFormatter={(val) => ` Rp ${val.toLocaleString("id-ID")}`}
    />
  );
};

export default ExpenseCategoryChart;
