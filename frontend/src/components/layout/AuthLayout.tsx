import React, { type ReactNode } from "react";
import authImg from "../../assets/images/bg-auth.webp";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen p-5 md:p-0 bg-cuswhite grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-full hidden md:flex justify-center items-center relative p-5">
        <img
          className="w-160 h-150 rounded-[30px]"
          src={authImg}
          alt="bg-auth"
        />
        {/* <div className="p-7 absolute left-5 top-5 bg-cuswhite"></div> */}
        <div className="p-7 absolute left-5 bottom-5 ">
          <p className="text-h4 font-thin text-cuswhite mb-2">Svtract is</p>
          <p className="leading-10 text-h3 font-bold text-cuswhite">
            Your digital solution for <br />
            smarter financial <br /> decisions.
          </p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
