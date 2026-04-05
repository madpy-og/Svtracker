import React from "react";
import type { ExpenseSchema } from "../../schemas/expenseSchema";
import { formatRupiah } from "../../utils/formatRupiah";
import { formatDate } from "../../utils/formatDate";
import { TrendingDown } from "lucide-react";

type Props = {
  datas: ExpenseSchema[];
};

const ExpenseList = ({ datas }: Props) => {
  return (
    <>
      {datas.map((data) => {
        return (
          <div className="w-full flex justify-between items-center ">
            <div className="flex gap-1 items-center">
              <img
                src={data.icon}
                alt="expense-icon"
                className="w-6 h-6 rounded-full"
              />
              <div className="flex flex-col items-start">
                <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize">
                  {data.category}
                </p>
                <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold">
                  {formatDate(data.date)}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center rounded-md gap-1 py-1 px-2 bg-danger/10 text-danger">
                <p className="text-capt-m md:text-capt font-semibold">
                  - {formatRupiah(data.amount)}
                </p>
                <TrendingDown
                  strokeWidth={2}
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ExpenseList;
