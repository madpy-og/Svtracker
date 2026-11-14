import { type CategorySchema, categorySchema } from "../schemas/categorySchema";

export const getAllCategory = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to get category data");
      return;
    }

    const data = await res.json();

    return data.category;
  } catch (error) {
    console.log("Internal server error");
  }
};

export const addCategory = async ({ name, icon }: CategorySchema) => {
  try {
    const newCategory = {
      name,
      icon,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`,
      {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      },
    );

    if (!res.ok) {
      console.log("Failed to add category data");
      return;
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      console.log("Failed to delete category data");
      return;
    }

    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log("Internal server error");
  }
};
