import React, { useState, useMemo, useEffect } from "react";
import type { DashboardSchema } from "../../schemas/dashboardSchema";
import List from "./List";
import CardPagination from "./CardPagination";

type Props = {
  transactions: DashboardSchema["recentTransactions"];
  itemsPerPage?: number;
};

const ListRecentTransactions = ({ transactions = [], itemsPerPage = 7 }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transactions.slice(start, start + itemsPerPage);
  }, [transactions, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-6 text-center text-cusdarkgrey text-bs-m md:text-bs">
        No recent transactions
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-1 md:gap-2">
        {paginatedTransactions.map((transaction) => {
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
      </div>
      {totalPages > 1 && (
        <CardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={transactions.length}
        />
      )}
    </div>
  );
};

export default ListRecentTransactions;
