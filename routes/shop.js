const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

const shopController = require('../controllers/shop');

router.get('/', shopController.getHome);

router.get('/products', productsController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
