import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
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
      return res.status(400).json({
        message: "Image URL and public ID are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: {
          url,
          publicId,
        },
      },
      { returnDocument: "after", runValidators: true },
    );

    res.status(200).json({
      message: "Profile image updated successfully",
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
