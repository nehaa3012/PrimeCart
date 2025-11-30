import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/Error.middleware.js";
import authRoute from "./routes/Auth.route.js";
import userRoute from "./routes/User.route.js";
import productRoute from "./routes/Product.route.js";
import orderRoute from "./routes/Order.route.js";
import reviewRoute from "./routes/Review.route.js";
import adminRoute from "./routes/Admin.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}); 
