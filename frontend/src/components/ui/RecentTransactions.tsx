import React from "react";
import type { DashboardSchema } from "../../schemas/dashboardSchema";
import { formatRupiah } from "../../utils/formatRupiah";
import { formatDate } from "../../utils/formatDate";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  transactions: DashboardSchema["recentTransactions"];
};

const RecentTransactions = ({ transactions }: Props) => {
  return (
    <>
      {transactions.map((transaction) => {
        return (
          <div className="w-full flex justify-between items-center ">
            <div className="flex gap-2 items-center">
              <img
                src={transaction.icon}
                alt="transaction-icon"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col items-start">
                <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize">
                  {transaction.source
                    ? transaction.source
                    : transaction.category}
                </p>
                <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div>
              {transaction.source ? (
                <div className="flex items-center rounded-md gap-1 py-1 px-2 bg-success/10 text-success">
                  <p className="text-capt-m md:text-capt font-semibold">
                    + {formatRupiah(transaction.amount)}
                  </p>
                  <TrendingUp
                    strokeWidth={2}
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                </div>
              ) : (
                <div className="flex items-center rounded-md gap-1 py-1 px-2 bg-danger/10 text-danger">
                  <p className="text-capt-m md:text-capt font-semibold">
                    - {formatRupiah(transaction.amount)}
                  </p>
                  <TrendingDown
                    strokeWidth={2}
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecentTransactions;
