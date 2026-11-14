import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ChartCard = ({ title, children, className = "" }: Props) => {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 ${className}`}>
      <h3 className="text-sm text-slate-800 font-semibold mb-3">{title}</h3>
      <div className="relative w-full h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
