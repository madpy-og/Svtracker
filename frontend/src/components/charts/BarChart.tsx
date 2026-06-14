import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pad labels and data so that the chart always renders at least 6 columns.
  // This forces few bars to align from left to right instead of centering.
  const MIN_COLUMNS = 7;
  const paddedLabels = [...labels];
  const paddedDatasets = datasets.map(ds => ({
    ...ds,
    data: [...ds.data],
    maxBarThickness: isMobile ? 30 : 50,
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
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: 10,
          font: {
            size: 11
          }
        },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: "#f5f5f7", // very light subtle color
        },
        ticks: {
          maxTicksLimit: 5, // Reduce number of labels
          padding: 10,
          font: {
            size: 11
          },
          callback: (value) => (yAxisFormatter ? yAxisFormatter(Number(value)) : value),
        },
      },
    },
  };

  const minChartWidth = isMobile
    ? Math.max(paddedLabels.length * 60 + 50, 300)
    : Math.max(paddedLabels.length * 80 + 80, 500);

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden pb-1 custom-scrollbar">
      <div style={{ width: `${minChartWidth}px`, height: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
