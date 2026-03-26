import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

const Home = () => {
  return (
    <div className="flex flex-col gap-3.75">
      <div className="grid grid-cols-4 gap-2.5">
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Income Total</p>
          <p className="text-h5 text-cusblack font-bold">200.000</p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Expense Total</p>
          <p className="text-h5 text-cusblack font-bold">10.000</p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">My Wallet</p>
          <p className="text-h5 text-cusblack font-bold">3.000.000</p>
        </Card>
        <Card className="h-32.5">
          <p className="text-bd text-cusblack font-semibold">Percentage</p>
          <p className="text-h5 text-cusblack font-bold">20%</p>
        </Card>
      </div>
      <div className="grid grid-cols-4 grid-row-2 gap-2.5">
        <Card className="col-span-2 row-span-2 h-105">
          <div></div>
        </Card>
        <Card className="col-span-2 row-span-1 h-51.25">
          <div></div>
        </Card>
        <Card className="col-span-2 row-span-1 h-51.25">
          <div></div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
