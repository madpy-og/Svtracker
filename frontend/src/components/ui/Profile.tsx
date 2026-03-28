import React from "react";

type Props = {
  url?: string;
};

const Profile = ({ url }: Props) => {
  return (
    <div className="flex items-center gap-2.5 ">
      <img
        src={url}
        alt="profile-image"
        className="w-10 h-10 rounded-4xl object-cover"
      />
      <p className="text-cusblack text-bd font-semibold">Madda Athia Rahman</p>
    </div>
  );
};

export default Profile;
