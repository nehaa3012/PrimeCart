import User from "../models/User.model.js";
import Order from "../models/Order.model.js";

// Get all users controller
export const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
};

// get single user controller
export const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } 

  res.status(200).json({
    success: true,
    user,
  });
};  

// update user role controller
export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
};

// delete user controller
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted",
  });
};

// Get all orders controller


export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    orders,
  });
};

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();

  res.status(200).json({
    success: true,
    stats: {
      users,
      orders,
    },
  });
};

