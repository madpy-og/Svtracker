import User from "../models/User.js";
import jwt from "jsonwebtoken";

// REGISTER MIDDLEWARE
export const validateRegister = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json("Input kosong, silahkan isi terlebih dahulu");
  }

  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json("Fullname, email, dan password wajib");
  }

  next();
};

export const checkUserExistRegister = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json("Email sudah terdaftar");
  }

  next();
};

// LOGIN MIDDLEWARE
export const validateLogin = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json("Input kosong, silahkan isi terlebih dahulu");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email dan password wajib");
  }

  next();
};

export const checkUserExistLogin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json("Email tidak terdaftar");
  }

  next();
};

// ANY MIDDLEWARE
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Token tidak ditemukan");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = {
      _id: decoded._id,
    };

    next();
  } catch (error) {
    console.error(error);
  }
};
