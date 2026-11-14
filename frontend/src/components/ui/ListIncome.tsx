import React, { useState, useMemo, useEffect } from "react";
import type { IncomeSchema } from "../../schemas/incomeSchema";
import List from "./List";
import { useDeleteIncome } from "../../hooks/useIncome";
import CardPagination from "./CardPagination";

type Props = {
  datas: IncomeSchema[];
  itemsPerPage?: number;
};

const ListIncome = ({ datas = [], itemsPerPage = 8 }: Props) => {
  const { mutate: deleteIncome } = useDeleteIncome();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(datas.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return datas.slice(start, start + itemsPerPage);
  }, [datas, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (!datas || datas.length === 0) {
    return (
      <div className="col-span-full py-6 text-center text-cusdarkgrey text-bs-m md:text-bs">
        No income records yet
      </div>
    );
  }

  return (
    <>
      {paginatedData.map((data) => {
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
      {totalPages > 1 && (
        <div className="col-span-full">
          <CardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={datas.length}
          />
        </div>
      )}
    </>
  );
};

export default ListIncome;
