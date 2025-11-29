import express from "express";
import { deleteUser, getAllOrders, getAllUsers, getDashboardStats, getSingleUser, updateUserRole } from "../controller/Admin.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";
import { authorizeRoles } from "../middleware/Role.middleware.js";

const router = express.Router();

router.get("/users", isAuthenticated, authorizeRoles("Admin"), getAllUsers);
router.get("/users/:id", isAuthenticated, authorizeRoles("Admin"), getSingleUser);
router.put("/users/role/:id", isAuthenticated, authorizeRoles("Admin"), updateUserRole);
router.delete("/users/:id", isAuthenticated, authorizeRoles("Admin"), deleteUser);
router.get("/orders", isAuthenticated, authorizeRoles("Admin"), getAllOrders);
router.get("/stats", isAuthenticated, authorizeRoles("Admin"), getDashboardStats);

export default router;
