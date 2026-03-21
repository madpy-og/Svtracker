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
      return res.status(404).json("User tidak ditemukan!");
    }

    const isPasswordValid = await user.comparePassword(req.body.password);
    if (isPasswordValid === false) {
      return res.status(400).json("Password tidak valid");
    }

    const token = await generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json("Login berhasil");
  } catch (error) {
    console.error(error);
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

    res.status(201).json("User berhasil ditambahkan");
  } catch (error) {
    console.error(error);
  }
};

export const checkAuth = async (req, res) => {
  res.status(200).json({ _id: req.user._id });
};

export const getUserInfo = async (req, res) => {
  try {
  } catch (error) {}
};
