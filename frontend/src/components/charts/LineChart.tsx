import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type Props = {
  title?: string;
  labels: string[];
  datasets: ChartData<"line">["datasets"];
  showLegend?: boolean;
  yAxisFormatter?: (value: number) => string;
};

const LineChart = ({ title, labels, datasets, showLegend = false, yAxisFormatter }: Props) => {
  const data: ChartData<"line"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
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

  return <Line data={data} options={options} />;
};

export default LineChart;
