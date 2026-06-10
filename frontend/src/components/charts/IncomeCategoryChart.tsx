import DoughnutChart from "./DoughnutChart";

const COLORS = [
  "#22c55e", "#3b82f6", "#f59e0b", "#ec4899",
  "#10b981", "#8b5cf6", "#14b8a6", "#f97316",
];

type SourceData = {
  name: string;
  icon: string;
  total: number;
};

type Props = {
  sources: SourceData[];
};

const IncomeCategoryChart = ({ sources }: Props) => {
  const labels = sources.map((s) => `${s.icon} ${s.name}`);
  const datasets = [
    {
      data: sources.map((s) => s.total),
      backgroundColor: COLORS.slice(0, sources.length),
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

export default IncomeCategoryChart;
