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


module.exports = {
    getAllProducts: getAllProducts,
}