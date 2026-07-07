import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  count?: number;
};

const SkeletonList = ({ count = 5 }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full flex justify-between items-center p-1 md:p-2">
          <div className="flex gap-2 items-center">
            <Skeleton circle width={32} height={32} className="md:w-8 md:h-8 w-6 h-6" />
            <div className="flex flex-col items-start gap-1">
              <Skeleton width={120} height={14} />
              <Skeleton width={80} height={10} />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton width={80} height={24} borderRadius={6} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonList;
