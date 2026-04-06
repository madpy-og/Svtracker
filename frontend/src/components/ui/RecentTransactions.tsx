import React from "react";
import type { DashboardSchema } from "../../schemas/dashboardSchema";
import { formatRupiah } from "../../utils/formatRupiah";
import { formatDate } from "../../utils/formatDate";
import { TrendingDown, TrendingUp } from "lucide-react";
import List from "./List";

type Props = {
  transactions: DashboardSchema["recentTransactions"];
};

const RecentTransactions = ({ transactions }: Props) => {
  return (
    <>
      {transactions.map((transaction) => {
        return (
          <List
            icon={transaction.icon}
            source={transaction.source}
            category={transaction.category}
            date={transaction.date}
            amount={transaction.amount}
          />
        );
      })}
    </>
  );
};

export default RecentTransactions;
