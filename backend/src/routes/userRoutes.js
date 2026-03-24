import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { updateProfileImage } from "../controllers/userController.js";

const router = express.Router();

router.put("/profile-image", verifyToken, updateProfileImage);

export default router;
