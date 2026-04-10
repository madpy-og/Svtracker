import React from "react";
import type { ExpenseSchema } from "../../../schemas/expenseSchema";
import { formatRupiah } from "../../../utils/formatRupiah";
import { formatDate } from "../../../utils/formatDate";
import { TrendingDown } from "lucide-react";
import List from "./List";

type Props = {
  datas: ExpenseSchema[];
};

const ExpenseList = ({ datas }: Props) => {
  return (
    <>
      {datas.map((data) => {
        return (
          <List
            key={data._id}
            icon={data.icon}
            category={data.category}
            date={data.date}
            amount={data.amount}
          />
        );
      })}
    </>
  );
};

export default ExpenseList;
