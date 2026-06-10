import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type Props = {
  title?: string;
  labels: string[];
  datasets: ChartData<"bar">["datasets"];
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
};

const BarChart = ({ title, labels, datasets, showLegend = false, yAxisFormatter }: Props) => {
  const data: ChartData<"bar"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: showLegend, position: "top" },
      title: { display: !!title, text: title || "" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (yAxisFormatter ? yAxisFormatter(Number(value)) : value),
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
