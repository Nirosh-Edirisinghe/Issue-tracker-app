import cloudinary from "../config/cloudinary.js";
import userModel from "../models/UserModel.js";

const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select(
      "name email phone image position createdAt"
    );

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const imageFile = req.file;
    const userId = req.user.id;
    let imageUrl;

    // Upload image 
    if (imageFile) {
      const uploadRes = await cloudinary.uploader.upload(imageFile.path, {
        folder: "profiles",
      });
      imageUrl = uploadRes.secure_url;
    }

    // Update user data in db
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        phone: req.body.phone,
        position: req.body.position,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    res.status(200).json({
      success: true,
      message: imageUrl
        ? "Profile updated successfully with image"
        : "Profile updated successfully (no image)",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error: error.message, 
    });
  }
};

export { getUserData, updateUserProfile }