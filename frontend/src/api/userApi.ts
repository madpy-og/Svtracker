export const getUserById = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed fetching user data");
      return;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const updateProfileImage = async (url: string, publicId: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/profile-image`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, publicId }),
      },
    );

    if (!res.ok) {
      console.log("Failed to update user profile image");
      return;
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};
