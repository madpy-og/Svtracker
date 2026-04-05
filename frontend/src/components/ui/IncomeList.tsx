import React from "react";
import type { IncomeSchema } from "../../schemas/incomeSchema";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { TrendingUp } from "lucide-react";
import List from "./List";

type Props = {
  datas: IncomeSchema[];
};

const IncomeList = ({ datas }: Props) => {
  return (
    <>
      {datas.map((data) => {
        return (
          <List
            icon={data.icon}
            source={data.source}
            date={data.date}
            amount={data.amount}
          />
        );
      })}
    </>
  );
};

export default IncomeList;
