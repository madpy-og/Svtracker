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
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { 
          maxTicksLimit: 6, // Specifically for 30 days charts to show like 1, 5, 10, 15 etc
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: "#f3f4f6", // very light subtle color
        },
        ticks: {
          maxTicksLimit: 5, // Reduce number of labels
          padding: 10,
          callback: (value) => (yAxisFormatter ? yAxisFormatter(Number(value)) : value),
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
