import React from "react";
import Card from "../../components/ui/Card";
import { useIncome } from "../../hooks/useIncome";

const Income = () => {
  // const { income } = useIncome();

  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-1 h-60 gap-2.5">
        <Card>
          <div></div>
        </Card>
      </div>
      <div className="grid grid-cols-1 h-100 gap-2.5">
        <Card>
          <p className="text-bd-m md:text-bd text-cusblack font-semibold">
            Income History
          </p>
          <div className="flex flex-col gap-3 p-2 mt-2 md:-4"></div>
        </Card>
      </div>
    </div>
  );
};

export default Income;
