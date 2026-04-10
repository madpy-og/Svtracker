import React from "react";
import type { UserSchema } from "../../../schemas/userSchema";

type Props = {
  user: UserSchema | null;
  className?: string;
  variant?: "horizontal" | "vertical";
};

const Profile = ({ user, className, variant }: Props) => {
  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <img
          src={user?.profileImage.url}
          alt="profile-image"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="text-cusblack text-bd-m md:text-bd font-semibold text-center leading-none">
            {user?.fullname}
          </p>
          <p className="text-capt-m md:text-capt text-center leading-none text-cusdarkgrey font-semibold">
            {user?.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={user?.profileImage.url}
        alt="profile-image"
        className="w-10 h-10 rounded-4xl object-cover"
      />
      <div className="flex flex-col gap-1">
        <p className="text-cusblack text-bd font-semibold leading-none">
          {user?.fullname}
        </p>
        <p className="text-capt leading-none text-cusdarkgrey font-semibold">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
