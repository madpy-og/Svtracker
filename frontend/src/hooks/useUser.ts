import { useCallback, useEffect, useState } from "react";
import { getUserById } from "../api/userApi";
import type { UserSchema } from "../schemas/userSchema";

export const useUser = () => {
  const [profile, setProfile] = useState<UserSchema | null>(null);

  const fetchUserData = useCallback(async () => {
    const data = await getUserById();

    if (!data) {
      console.log("Something went wrong");
    }

    setProfile(data);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { profile, refetchUserData: fetchUserData };
};
