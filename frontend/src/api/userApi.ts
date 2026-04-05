const BASE_URL = "http://localhost:3000/api/v1";

export const getUserById = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
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
