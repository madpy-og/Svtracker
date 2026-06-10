import DoughnutChart from "./DoughnutChart";

const COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444",
  "#3b82f6", "#ec4899", "#14b8a6", "#f97316",
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
