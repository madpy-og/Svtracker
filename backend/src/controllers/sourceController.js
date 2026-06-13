import Source from "../models/Source.js";

export const getAllSource = async (req, res) => {
  try {
    const source = await Source.findAllSorted();

    res.status(200).json({ source, message: "Fetching source successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addSource = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    await Source.createSource({ name, icon });

    res.status(201).json({ message: "Create new source successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSource = async (req, res) => {
  try {
    await Source.deleteById(req.params.id);

    res.status(200).json({ message: "Source deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
