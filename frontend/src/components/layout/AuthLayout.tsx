import React, { type ReactNode } from "react";
import authImg from "../../assets/images/bg-auth.webp";
import logo from "../../assets/images/svtracker-white-logo.png";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen p-5 md:p-0 bg-cuswhite grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-full hidden md:flex justify-center items-center p-5">
        <div className="relative w-160 h-150">
          <img
            className="w-full h-full rounded-[30px] object-cover"
            src={authImg}
            alt="bg-auth"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-8 ">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <div>
              <p className="text-h4 font-thin text-cuswhite mb-2">
                Svtracker is
              </p>
              <p className="leading-10 text-h3 font-bold text-cuswhite">
                Your digital solution for <br />
                smarter financial <br /> decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
