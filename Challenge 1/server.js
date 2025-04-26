require("dotenv").config();
const express = require("express");
const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/products");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errorHandler } = require("./src/middleware/errorHandler");
const { DB_URL, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

const DB = DB_URL;
try {
  mongoose
    .connect(DB)

    .then(() => console.log("DB connection successful!"));
} catch (e) {
  console.log(e);
}
const port = PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${port}`));
