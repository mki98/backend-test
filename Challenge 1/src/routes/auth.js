const router = require("express").Router();
const authController = require("../controllers/authController");
const { registerValidation } = require("../middleware/validationMiddleware");

router.post("/register", registerValidation, authController.register);
router.post("/login", authController.login);
module.exports = router;
