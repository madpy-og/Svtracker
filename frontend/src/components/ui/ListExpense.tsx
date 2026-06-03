import React from "react";
import type { ExpenseSchema } from "../../schemas/expenseSchema";
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
            icon={data.category.icon}
            categoryName={data.category.name}
            date={data.date}
            amount={data.amount}
          />
        );
      })}
    </>
  );
};

export default ExpenseList;
