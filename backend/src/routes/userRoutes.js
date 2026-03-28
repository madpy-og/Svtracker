import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUserById,
  updateProfileImage,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getUserById);
router.put("/profile-image", verifyToken, updateProfileImage);

export default router;
