import React from "react";
import type { DashboardSchema } from "../../schemas/dashboardSchema";
import { formatRupiah } from "../../utils/formatRupiah";
import { formatDate } from "../../utils/formatDate";

type Props = {
  transactions: DashboardSchema["recentTransactions"];
};

const RecentTransactions = ({ transactions }: Props) => {
  return (
    <>
      {transactions.map((transaction) => {
        return (
          <div className="w-full flex justify-between items-center ">
            <div className="flex gap-1 items-center">
              <img
                src={transaction.icon}
                alt="transaction-icon"
                className="w-6 h-6 rounded-full"
              />
              <div className="flex flex-col items-start">
                <p className="text-bd text-cusblack font-semibold capitalize">
                  {transaction.source
                    ? transaction.source
                    : transaction.category}
                </p>
                <p className="text-capt text-cusdarkgrey font-semibold">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-bd text-cusblack font-semibold">
                {formatRupiah(transaction.amount)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecentTransactions;
