const Product = require('../models/products');


exports.getHome = (req, res, next) => {
	res.render('./shop/index', {
		pageTitle: 'Add Product',
		path: '/'
	});
};

exports.getAddProduct = (req, res, next) => {
	res.render('./admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
};

exports.getAdminProduct = (req, res, next) => {
	res.render('./shop/product-list', {
		pageTitle: 'Add Product',
		path: '/admin/products'
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/product-list', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'Shop',
			path: '/products'
		});
	});

};

exports.getCart = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/cart', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'cart',
			path: '/cart'
		});
	});
};
