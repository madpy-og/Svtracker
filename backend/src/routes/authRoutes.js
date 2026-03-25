import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
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
router.post("/logout", logoutUser);

export default router;
