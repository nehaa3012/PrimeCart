import express from "express";
import { addReview } from "../controller/Review.controller.js";
import { isAuthenticated } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/:productId", isAuthenticated, addReview);

export default router;
