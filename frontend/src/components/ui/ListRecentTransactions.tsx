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
  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-6 text-center text-cusdarkgrey text-bs-m md:text-bs">
        No recent transactions
      </div>
    );
  }

  return (
    <>
      {transactions.slice(0, 7).map((transaction) => {
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
