const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('./shop/product-list', {
			prods: products,
			hasProducts: products?.length > 0,
			pageTitle: 'All Products',
			path: '/products'
		});
	});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId, (product) => {
		res.render(`./shop/product-detail`, {
			product: product,
			hasProducts: product?.length > 0,
			pageTitle: 'Product detail',
			path: `/products`
		});
	});
};
