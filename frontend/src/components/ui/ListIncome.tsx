import React from "react";
import type { IncomeSchema } from "../../schemas/incomeSchema";
import List from "./List";

type Props = {
  datas: IncomeSchema[];
};

const ListIncome = ({ datas }: Props) => {
  return (
    <>
      {datas.map((data) => {
        return (
          <List
            key={data._id}
            icon={data.source.icon}
            sourceName={data.source.name}
            date={data.date}
            amount={data.amount}
          />
        );
      })}
    </>
  );
};

export default ListIncome;
