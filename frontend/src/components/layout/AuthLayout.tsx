import React, { type ReactNode } from "react";
import authImg from "../../assets/images/bg-auth.webp";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-cuswhite grid grid-cols-2">
      <div className="w-full h-full flex justify-center items-center p-5">
        <img
          className="w-160 h-150 rounded-[30px]"
          src={authImg}
          alt="bg-auth"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
