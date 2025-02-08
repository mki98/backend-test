const Product = require("../models/Product");
const AppError = require("../utils/appError");
const { tryCatch } = require("../utils/tryCatch");

exports.createProduct = tryCatch(async (req, res) => {
  const product = new Product(req.body);
  console.log(req.body);
  await product.save();
  res.status(201).json(product);
});

exports.getProducts = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { category, sortBy, sortOrder } = req.query;

  const query = {};
  if (category) query.category = category;

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
});

exports.getProductById = tryCatch(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new AppError("Fail", "Product not found", 404);
  }
  res.json(product);
});

exports.updateProduct = tryCatch(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new AppError("Fail", "Product not found", 404);
  }
  res.json(product);
});

exports.deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new AppError("Fail", "Product not found", 404);
  }
  res.json({ message: "Product deleted successfully" });
});
