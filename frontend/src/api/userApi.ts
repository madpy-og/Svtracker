export const getUserById = async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}/api/v1/users`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed fetching user data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
