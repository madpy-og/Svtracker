import { v2 as cloudinary } from "cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UPLOAD_CONFIG = {
  avatar: {
    getFolder: (userId) => `avatars/users/${userId}`,
    maxSize: 2 * 1024 * 1024,
  },
  source: {
    getFolder: (userId) => `sources/users/${userId}`,
    maxSize: 2 * 1024 * 1024,
  },
  category: {
    getFolder: (userId) => `categories/users/${userId}`,
    maxSize: 2 * 1024 * 1024,
  },
};

export const getSignature = async (req, res) => {
  try {
    const { fileType, fileSize, uploadType } = req.body;

    const config = UPLOAD_CONFIG[uploadType];
    if (!config) {
      return res.status(400).json({ message: "Invalid upload type" });
    }

    if (!fileType || !fileSize) {
      return res.status(400).json({
        message: "File type and file size are required",
      });
    }

    if (!ALLOWED_TYPES.includes(fileType)) {
      return res.status(415).json({ message: "Unsupported image format" });
    }

    if (fileSize > config.maxSize) {
      const limitMB = config.maxSize / (1024 * 1024);
      return res.status(413).json({
        message: `Image size exceeds the maximum limit (${limitMB}MB)`,
      });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = config.getFolder(req.user._id);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET,
    );

    res.status(200).json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
