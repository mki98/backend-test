const { body, param } = require("express-validator");

exports.productValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];
exports.registerValidation = [
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
