import express from "express";
import { createOrderController, deleteOrderController, getMyOrdersController, updateOrderController } from "../controller/Order.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";
import { authorizeRoles } from "../middleware/Role.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createOrderController);
router.get("/myorders", isAuthenticated, getMyOrdersController);
router.put("/:id", isAuthenticated, authorizeRoles("Admin"), updateOrderController);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteOrderController);

export default router;
