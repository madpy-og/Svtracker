import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions, TooltipItem } from "chart.js";

type Props = {
  title?: string;
  labels: string[];
  datasets: ChartData<"doughnut">["datasets"];
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  tooltipFormatter?: (value: number) => string;
  cutout?: string;
};

const DoughnutChart = ({
  title,
  labels,
  datasets,
  showLegend = true,
  legendPosition = "right",
  tooltipFormatter,
  cutout = "70%",
}: Props) => {
  const data: ChartData<"doughnut"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    plugins: {
      legend: { display: showLegend, position: legendPosition, labels: { font: { size: 12 } } },
      title: { display: !!title, text: title || "" },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"doughnut">) => {
            const val = ctx.raw as number;
            return tooltipFormatter ? tooltipFormatter(val) : ` ${val}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
