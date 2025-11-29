import express from "express";
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, updateProductController } from "../controller/Product.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";
import { authorizeRoles } from "../middleware/Role.middleware.js";
import upload from "../middleware/Upload.middleware.js";

const router = express.Router();

router.get("/all", getAllProductsController);
router.get("/:id", getSingleProductController);
router.post("/create", isAuthenticated, authorizeRoles("Admin"), upload.array("images", 10), createProductController);
router.put("/:id", isAuthenticated, authorizeRoles("Admin"), upload.array("images", 10), updateProductController);
router.delete("/:id", isAuthenticated, authorizeRoles("Admin"), deleteProductController);

export default router;
