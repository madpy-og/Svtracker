import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  className?: string;
  variant?: "horizontal" | "vertical";
};

const SkeletonProfile = ({ className = "", variant = "horizontal" }: Props) => {
  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative w-20 h-20">
          <Skeleton circle width="100%" height="100%" />
        </div>
        <div className="flex flex-col gap-1 items-center w-full">
          <Skeleton width={120} height={16} />
          <Skeleton width={160} height={12} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 w-full ${className}`}>
      <div className="relative min-w-[40px] w-10 h-10">
        <Skeleton circle width="100%" height="100%" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Skeleton width={100} height={16} />
        <Skeleton width={140} height={12} />
      </div>
    </div>
  );
};

export default SkeletonProfile;
