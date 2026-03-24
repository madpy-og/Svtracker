import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json("User tidak ditemukan");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const updateFullname = async (req, res) => {
  try {
  } catch (error) {}
};

export const updateProfileImage = async (req, res) => {
  try {
    const { url, publicId } = req.body;

    if (!url || !publicId) {
      res.status(400).json("Input tidak valid");
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: {
          url,
          publicId,
        },
      },
      { returnDocument: "after", runValidators: true },
    );

    res.status(200).json("Profile image berhasil diupdate");
  } catch (error) {
    console.error(error);
  }
};
