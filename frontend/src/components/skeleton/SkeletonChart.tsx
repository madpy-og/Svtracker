import React from "react";
import Skeleton from "react-loading-skeleton";
import Card from "../ui/Card";

const SkeletonChart = () => {
  return (
    <Card className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <Skeleton width={150} height={20} />
        <Skeleton width={120} height={16} />
      </div>
      <div className="flex-1 w-full flex items-end gap-2 px-2 mt-4">
        {/* Simulating bar charts */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <Skeleton height={Math.floor(Math.random() * 120) + 40} borderRadius={6} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkeletonChart;
