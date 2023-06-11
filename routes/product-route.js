const express = require("express");
const productController = require("../controllers/products-controllers");

const router = express.Router();

router.get("/products", productController.getAllProducts);

module.exports = router;
