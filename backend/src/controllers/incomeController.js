import Income from "../models/Income.js";

export const getAllIncome = async (req, res) => {
  try {
    const userId = req.user._id;

    const income = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({ income, message: "Fetching income successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addIncome = async (req, res) => {
  try {
    const userId = req.user._id;

    const { icon, source, amount, date } = req.body;

    if (!icon || !source || !amount) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    res.status(201).json({ message: "Create new income successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Income deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
