const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
productSchema.index({ category: 1, price: -1 });
productSchema.index({ createdAt: -1 });
module.exports = mongoose.model("Product", productSchema);
