import React from "react";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  icon: string;
  source?: string;
  category?: string;
  date: string;
  amount: number;
};

const List = ({ icon, source, category, date, amount }: Props) => {
  return (
    <div className="w-full flex justify-between items-center p-1 md:p-2 rounded-md hover:bg-cusgrey">
      <div className="flex gap-2 items-center">
        <img
          src={icon}
          alt="income-icon"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />
        <div className="flex flex-col items-start">
          <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize">
            {source ? source : category}
          </p>
          <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold">
            {formatDate(date)}
          </p>
        </div>
      </div>
      <div>
        <div
          className={`${source ? "flex items-center rounded-md gap-1 py-1 px-2 bg-success/10 text-success" : "flex items-center rounded-md gap-1 py-1 px-2 bg-danger/10 text-danger"}`}
        >
          <p className="text-capt-m md:text-capt font-semibold">
            + {formatRupiah(amount)}
          </p>
          {source ? (
            <TrendingUp strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <TrendingDown strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
