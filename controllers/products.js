const Product = require('../models/products');



exports.getProducts = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./shop/product-list', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'All Products',
			path: '/products'
		});
	});

};


