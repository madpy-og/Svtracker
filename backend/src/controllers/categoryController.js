import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.aggregate([
      {
        $addFields: {
          sortOrder: {
            $cond: {
              if: { $eq: [{ $toLower: "$name" }, "others"] },
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $sort: {
          sortOrder: 1,
          name: 1,
        },
      },
      {
        $project: {
          sortOrder: 0,
        },
      },
    ]);

    res.status(200).json({ category, message: "Fetching category successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    await Category.create({
      name,
      icon,
    });

    res.status(201).json({ message: "Create new category successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Category deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
