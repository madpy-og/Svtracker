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
    datasets: datasets.map(ds => ({ ...ds, barThickness: 40 })),
  };

  const options: ChartOptions<"bar"> = {
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
        ticks: { maxTicksLimit: 12 },
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

  const minChartWidth = Math.max(labels.length * 60 + 80, 250);

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden pb-1 custom-scrollbar">
      <div style={{ width: `${minChartWidth}px`, height: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
