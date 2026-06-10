import React from "react";
import type { DashboardSchema } from "../../schemas/dashboardSchema";
import { formatRupiah } from "../../utils/formatRupiah";
import { formatDate } from "../../utils/formatDate";
import { TrendingDown, TrendingUp } from "lucide-react";
import List from "./List";

type Props = {
  transactions: DashboardSchema["recentTransactions"];
};

const ListRecentTransactions = ({ transactions }: Props) => {
  return (
    <>
      {transactions.map((transaction) => {
        return (
          <List
            key={transaction._id}
            icon={`${transaction.source?.icon ?? transaction.category?.icon ?? ""}`}
            sourceName={transaction.source?.name}
            categoryName={transaction.category?.name}
            date={transaction.date}
            amount={transaction.amount}
          />
        );
      })}
    </>
  );
};

export default ListRecentTransactions;
