const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controllers");
const imageUploadMiddleware = require("../middleware/image-upload");

router.get("/products", adminController.getProducts);

router.get("/products/new",adminController.getNewProduct);

router.post("/products",imageUploadMiddleware,adminController.createNewProduct);

module.exports = router;
