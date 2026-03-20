import express from "express";
import {
  loginUser,
  registerUser,
  getUserInfo,
} from "../controllers/authController.js";
import {
  checkUserExistLogin,
  checkUserExistRegister,
  validateLogin,
  validateRegister,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  checkUserExistRegister,
  registerUser,
);
router.post("/login", validateLogin, checkUserExistLogin, loginUser);

export default router;
