import express from "express";
import { loginController, logoutController, registerController, getMeController } from "../controller/Auth.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", isAuthenticated, logoutController);
router.get("/me", isAuthenticated, getMeController);

export default router;
