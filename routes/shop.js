const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

const shopController = require('../controllers/shop');

router.get('/', shopController.getHome);

router.get('/products', productsController.getProducts);

// es importantte que esta ruta vaya al final, ya que sino nunca
// entraria a endpoints del tipo /products/delete/
router.get('/products/:productId', productsController.getProduct);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
