import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  const baseClass = "bg-cuswhite rounded-[10px] p-3.75 shadow-md";
  return <div className={`${baseClass} ${className}`}>{children}</div>;
};

export default Card;
