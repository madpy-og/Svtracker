import React from "react";
import Card from "../../components/ui/Card";
import { useIncome } from "../../hooks/useIncome";
import IncomeList from "../../components/ui/IncomeList";
const Income = () => {
  const { income } = useIncome();

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-1 h-60 gap-2.5">
        <Card>
          <div></div>
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-2.5">
        <Card className="flex flex-col gap-2">
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Income Source
          </p>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-1 md:gap-2">
            <IncomeList datas={income} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Income;
