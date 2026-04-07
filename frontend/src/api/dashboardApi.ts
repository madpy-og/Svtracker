export const getDashboard = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/dashboard`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get dashboard data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Internal server error");
  }
};
