const express = require('express');

const ordersController = require('../controllers/order-controllers');

const router = express.Router();

router.post('/', ordersController.addOrder); 

router.get('/', ordersController.getOrders); 

module.exports = router;