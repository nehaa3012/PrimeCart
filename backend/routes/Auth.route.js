import express from "express";
import { loginController, logoutController, registerController } from "../controller/Auth.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", isAuthenticated, logoutController);
// router.get("/me", isAuthenticated, getMe);

export default router;
