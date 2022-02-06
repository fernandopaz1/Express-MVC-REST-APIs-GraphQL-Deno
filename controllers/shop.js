const Product = require('../models/products');


exports.getHome = (req, res, next) => {
	res.render('./shop/index', {
		pageTitle: 'Shop',
		path: '/'
	});
};

exports.getCart = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/cart', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'Your Cart',
			path: '/cart'
		});
	});
};

exports.getOrders = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/orders', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'Your orders',
			path: '/orders'
		});
	});
};

exports.getCheckout = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/checkout', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'Checkout',
			path: '/checkout'
		});
	});
};