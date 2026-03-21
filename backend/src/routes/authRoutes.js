import express from "express";
import {
  loginUser,
  registerUser,
  getUserInfo,
  checkAuth,
} from "../controllers/authController.js";
import {
  checkUserExistLogin,
  checkUserExistRegister,
  validateLogin,
  validateRegister,
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, checkAuth);
router.post(
  "/register",
  validateRegister,
  checkUserExistRegister,
  registerUser,
);
router.post("/login", validateLogin, checkUserExistLogin, loginUser);

export default router;
