const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkRole = (role) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    req.user = user; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = checkRole;
