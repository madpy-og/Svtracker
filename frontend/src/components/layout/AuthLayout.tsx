import React, { type ReactNode } from "react";
import authImg from "../../assets/images/vector1.webp";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-cuswhite grid grid-cols-2">
      <div className="w-full h-full p-5">
        <div className="w-full h-full bg-cusblack rounded-[30px]">
          <div></div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
