import React from "react";
import Skeleton from "react-loading-skeleton";
import Card from "../ui/Card";

const SkeletonCard = () => {
  return (
    <Card className="h-26 md:h-32.5">
      <Skeleton width="60%" className="mb-2" />
      <Skeleton width="80%" height={28} />
    </Card>
  );
};

export default SkeletonCard;
