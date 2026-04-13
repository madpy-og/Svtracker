import { type SourceSchema, sourceSchema } from "../schemas/sourceSchema";

export const getAllSource = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/sources`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("Failed to get source data");
      return;
    }

    const data = await res.json();

    return data.source;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addSource = async ({ name, icon }: SourceSchema) => {
  try {
    const newSource = {
      name,
      icon,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/sources`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSource),
    });

    if (!res.ok) {
      console.log("Failed to add source data");
      return;
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const deleteSource = async (id: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/sources/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to delete source data");
      return;
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};
