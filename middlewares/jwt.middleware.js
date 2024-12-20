const jwt = require('jsonwebtoken');
const User = require('../models/database/usersSchema');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secure_secret_here");
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.clearCookie('token');
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;