import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = async (_id) => {
  const token = jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(req.body.password);
    if (isPasswordValid === false) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    await User.create({
      fullname: fullname,
      email: email,
      password: password,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ _id: req.user._id, message: "Authenticated" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
