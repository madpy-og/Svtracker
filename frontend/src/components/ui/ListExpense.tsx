import React from "react";
import type { ExpenseSchema } from "../../schemas/expenseSchema";
import List from "./List";
import { useDeleteExpense } from "../../hooks/useExpense";

type Props = {
  datas: ExpenseSchema[];
};

const ListExpense = ({ datas }: Props) => {
  const { mutate: deleteExpense } = useDeleteExpense();

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
            onDelete={() => deleteExpense(data._id as string)}
          />
        );
      })}
    </>
  );
};

export default ListExpense;
