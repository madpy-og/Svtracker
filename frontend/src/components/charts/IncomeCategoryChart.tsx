import DoughnutChart from "./DoughnutChart";

const COLORS = [
  "rgba(252, 57, 22, 1)", "rgba(252, 57, 22, 0.85)",
  "rgba(252, 57, 22, 0.7)", "rgba(252, 57, 22, 0.55)",
  "rgba(252, 57, 22, 0.4)", "rgba(252, 57, 22, 0.25)",
  "rgba(252, 57, 22, 0.15)", "rgba(252, 57, 22, 0.05)",
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
