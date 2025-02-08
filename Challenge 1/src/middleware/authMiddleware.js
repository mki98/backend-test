const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { JWT_SECRET } = process.env;

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AppError("Fail", "Access denied", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Fail", "Invalid Token", 401);
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    throw new AppError("Fail", "Admin access required", 403);
  next();
};
