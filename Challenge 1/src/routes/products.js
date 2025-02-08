const router = require("express").Router();
const productController = require("../controllers/productController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middleware/authMiddleware");
const { productValidation } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(productController.getProducts)
  .post(
    authenticate,
    authorizeAdmin,
    productValidation,
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProductById)
  .put(authenticate, authorizeAdmin, productController.updateProduct)
  .delete(authenticate, authorizeAdmin, productController.deleteProduct);

module.exports = router;
