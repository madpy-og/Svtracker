import React from "react";
import type { IncomeSchema } from "../../schemas/incomeSchema";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { TrendingUp } from "lucide-react";

type Props = {
  datas: IncomeSchema[];
};

const IncomeList = ({ datas }: Props) => {
  return (
    <>
      {datas.map((data) => {
        return (
          <div className="w-full flex justify-between items-center p-2 rounded-md hover:bg-cusgrey">
            <div className="flex gap-2 items-center">
              <img
                src={data.icon}
                alt="income-icon"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col items-start">
                <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize">
                  {data.source}
                </p>
                <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold">
                  {formatDate(data.date)}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center rounded-md gap-1 py-1 px-2 bg-success/10 text-success">
                <p className="text-capt-m md:text-capt font-semibold">
                  + {formatRupiah(data.amount)}
                </p>
                <TrendingUp strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IncomeList;
