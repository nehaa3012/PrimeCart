import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import { getFilesArray } from "../utils/Multer.js";
import { deletefromCloudinary, uploadtoCloudinary } from "../utils/Cloudinary.js";

// Get user profile controller
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
};

// Update user profile controller
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const files = getFilesArray(req);

  if (files.length > 0) {
    if (user.avatar?.public_id) {
      await deletefromCloudinary(user.avatar.public_id);
    }
    const uploadedImage = await uploadtoCloudinary(files[0].buffer, "avatars");

    user.avatar = {
      public_id: uploadedImage.public_id,
      secure_url: uploadedImage.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

// Change password controller
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Please provide both old and new passwords" });
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return res.status(400).json({ message: "Old password incorrect" });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};

// Get my orders controller

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

