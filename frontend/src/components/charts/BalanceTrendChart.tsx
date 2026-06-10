import LineChart from "./LineChart";

type Transaction = {
  date: string;
  amount: number;
  type: "income" | "expense";
};

type Props = {
  transactions: Transaction[];
};

const BalanceTrendChart = ({ transactions }: Props) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningBalance = 0;
  const chartData = sorted.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: runningBalance };
  });

  const labels = chartData.map((d) =>
    new Date(d.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })
  );

  const datasets = [
    {
      label: "Saldo",
      data: chartData.map((d) => d.balance),
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.15)",
      fill: true,
      tension: 0.4,
      pointRadius: 2,
    },
  ];

  return (
    <LineChart
      title="Tren Saldo Kumulatif"
      labels={labels}
      datasets={datasets}
      yAxisFormatter={(value) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          notation: "compact",
        }).format(value)
      }
    />
  );
};

export default BalanceTrendChart;
