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
  // Pad labels and data so that the chart always renders at least 6 columns.
  // This forces few bars to align from left to right instead of centering.
  const MIN_COLUMNS = 7;
  const paddedLabels = [...labels];
  const paddedDatasets = datasets.map(ds => ({
    ...ds,
    data: [...ds.data],
    maxBarThickness: 40,
  }));

  if (paddedLabels.length < MIN_COLUMNS) {
    const diff = MIN_COLUMNS - paddedLabels.length;
    for (let i = 0; i < diff; i++) {
      paddedLabels.push("");
      paddedDatasets.forEach((ds) => ds.data.push(null as any));
    }
  }

  const data: ChartData<"bar"> = {
    labels: paddedLabels,
    datasets: paddedDatasets,
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
        ticks: { 
          maxTicksLimit: 12,
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: 11
          }
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
          padding: 8,
          font: {
            size: 11
          },
          callback: (value) => (yAxisFormatter ? yAxisFormatter(Number(value)) : value),
        },
      },
    },
  };

  return (
    <div className="w-full h-full relative pb-1">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
