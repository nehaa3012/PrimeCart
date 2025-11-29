import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - Please login to access this resource" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
   
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in isAuthenticated middleware: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};