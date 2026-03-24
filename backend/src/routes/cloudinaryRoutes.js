import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getSignature } from "../controllers/cloudinaryController.js";

const router = express.Router();

router.post("/signature", verifyToken, getSignature);

export default router;
