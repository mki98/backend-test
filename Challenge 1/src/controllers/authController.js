const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Users = require("../models/Users");
const { tryCatch } = require("../utils/tryCatch");
const AppError = require("../utils/appError");
const { JWT_SECRET, JWT_EXP } = process.env;

exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Fail", "Invalid credentials", 401);
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });
  res.json({ token });
});

exports.register = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new AppError("Fail", "Email already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Users({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, email: user.email, role: user.role },
  });
});
