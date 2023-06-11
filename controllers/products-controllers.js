const Product = require("../models/product-model");

async function getAllProducts(req, res) {
  let products;
  try {
    products = await Product.findAll();
  } catch (error) {
    next(error);
    return;
  }

  res.render("customer/products/all-products", { products: products });
}

async function getProductDetails(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);
    res.render("customer/products/product-detail", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
