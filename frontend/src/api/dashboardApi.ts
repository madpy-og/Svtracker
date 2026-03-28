const BASE_URL = "http://localhost:3000/api/v1";

export const getDashboardData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get dashboard data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
