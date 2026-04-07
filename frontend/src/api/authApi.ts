type User = {
  fullname?: string;
  email: string;
  password: string;
};

export const checkAuth = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
      credentials: "include",
    });

    return res.ok;
  } catch (error) {
    return false;
  }
};

export const register = async (user: User) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );

  if (!res.ok) {
    console.log("Failed to register account");
  }

  return res.json();
};

export const login = async (user: User) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    console.log("Failed to login");
  }

  return res.json();
};

export const logout = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!res.ok) {
    console.log("Failed to logout");
  }
};
