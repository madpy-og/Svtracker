import React from "react";
import Card from "../Card";
import type { UserSchema } from "../../../schemas/userSchema";

type Props = {
  openModal: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  onSuccess: () => void;
  user: UserSchema | null;
};

const ProfileModal = ({ openModal, setOpenModal, onSuccess }: Props) => {
  if (openModal === "editProfile") {
    return (
      <>
        <div
          onClick={() => {
            setOpenModal(null);
          }}
          className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-30 opacity-100"
        ></div>
        <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Card className="relative w-90">
            <div>dhfalsdflaskdj</div>
          </Card>
        </div>
      </>
    );
  }

  return null;
};

export default ProfileModal;
