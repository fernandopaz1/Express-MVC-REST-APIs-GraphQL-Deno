const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll();
	res.render('shop', {
		prods: products,
		hasProducts: products?.length>0,
		pageTitle: 'Shop',
		path: '/'
	});
};
