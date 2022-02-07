const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getHome = (req, res, next) => {
	res.render('./shop/index', {
		pageTitle: 'Shop',
		path: '/'
	});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.addProduct(prodId, product.price);
	});
	res.redirect('/cart');
};

exports.getCart = (req, res, next) => {
	Cart.fetchCart((cart) => {
		res.render('./shop/cart', {
			prods: cart.products,
			hasProducts: cart.products.length > 0,
			pageTitle: 'Your Cart',
			path: '/cart'
		});
	});
};

exports.getOrders = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('./shop/orders', {
			prods: products,
			hasProducts: products?.length > 0,
			pageTitle: 'Your orders',
			path: '/orders'
		});
	});
};

exports.getCheckout = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('./shop/checkout', {
			prods: products,
			hasProducts: products?.length > 0,
			pageTitle: 'Checkout',
			path: '/checkout'
		});
	});
};
