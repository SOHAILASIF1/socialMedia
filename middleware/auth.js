import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Login first",
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
