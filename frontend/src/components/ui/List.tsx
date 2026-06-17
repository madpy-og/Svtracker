import React from "react";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { TrendingDown, TrendingUp, Trash2 } from "lucide-react";

type Props = {
  icon: string;
  sourceName?: string;
  categoryName?: string;
  date: string;
  amount: number;
  onDelete?: () => void;
};

const List = ({ icon, sourceName, categoryName, date, amount, onDelete }: Props) => {
  return (
    <div className="w-full flex justify-between items-center p-1 md:p-2 rounded-md hover:bg-cusgrey group">
      <div className="flex gap-2 items-center">
        <img
          src={icon}
          alt="income-icon"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />
        <div className="flex flex-col items-start">
          <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize whitespace-nowrap">
            {sourceName ? sourceName : categoryName}
          </p>
          <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold whitespace-nowrap">
            {formatDate(date)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`${sourceName ? "flex items-center rounded-md gap-1 py-1 px-2 whitespace-nowrap bg-success/10 text-success" : "flex items-center rounded-md gap-1 py-1 px-2 whitespace-nowrap bg-danger/10 text-danger"}`}
        >
          {sourceName ? (
            <>
              <p className="text-capt-m md:text-capt font-semibold">
                + {formatRupiah(amount)}
              </p>
              <TrendingUp strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
            </>
          ) : (
            <>
              <p className="text-capt-m md:text-capt font-semibold">
                - {formatRupiah(amount)}
              </p>
              <TrendingDown strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
            </>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 rounded-md text-cusdarkgrey hover:bg-danger/10 hover:text-danger transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
