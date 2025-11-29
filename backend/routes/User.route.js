import express from "express";
import { changePassword, getMyOrders, getUserProfile, updateUserProfile } from "../controller/User.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";
import upload from "../middleware/Upload.middleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile/update", isAuthenticated, upload.single("avatar"), updateUserProfile);
router.put("/password/update", isAuthenticated, changePassword);
router.get("/orders", isAuthenticated, getMyOrders);

export default router;
