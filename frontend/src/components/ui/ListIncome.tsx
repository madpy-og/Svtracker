import React from "react";
import type { IncomeSchema } from "../../schemas/incomeSchema";
import List from "./List";
import { useDeleteIncome } from "../../hooks/useIncome";

type Props = {
  datas: IncomeSchema[];
};

const ListIncome = ({ datas }: Props) => {
  const { mutate: deleteIncome } = useDeleteIncome();

  if (!datas || datas.length === 0) {
    return (
      <div className="col-span-full py-6 text-center text-cusdarkgrey text-bs-m md:text-bs">
        No income records yet
      </div>
    );
  }

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
            onDelete={() => deleteIncome(data._id as string)}
          />
        );
      })}
    </>
  );
};

export default ListIncome;
