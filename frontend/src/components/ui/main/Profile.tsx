import React from "react";
import type { UserSchema } from "../../../schemas/userSchema";
import { EditButton } from "../Button";

type Props = {
  user: UserSchema | null;
  className?: string;
  variant?: "horizontal" | "vertical";
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
};

const Profile = ({ user, className, variant, setOpenModal }: Props) => {
  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative w-20 h-20">
          <img
            src={user?.profileImage.url}
            alt="profile-image"
            className="w-full h-full rounded-full object-cover"
          />
          <EditButton
            style={variant}
            variant="editProfile"
            setOpenModal={setOpenModal}
          />
        </div>
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
  } else if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="relative w-10 h-10">
          <img
            src={user?.profileImage.url}
            alt="profile-image"
            className="w-full h-full rounded-full object-cover"
          />
          <EditButton
            style={variant}
            variant="editProfile"
            setOpenModal={setOpenModal}
          />
        </div>
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
  }
};

export default Profile;
