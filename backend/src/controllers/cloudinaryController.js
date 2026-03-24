import { v2 as cloudinary } from "cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export const getSignature = async (req, res) => {
  try {
    const { fileType, fileSize } = req.body;

    if (!ALLOWED_TYPES.includes(fileType)) {
      return res.status(400).json({ message: "Format gambar tidak valid" });
    }

    if (fileSize > MAX_SIZE) {
      return res.status(400).json({ message: "Ukuran gambar terlalu besar" });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = `avatars/users/${req.user._id}`;

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET,
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    console.error(error);
  }
};
