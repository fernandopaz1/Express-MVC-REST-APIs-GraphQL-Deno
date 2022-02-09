const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
	res.render('./admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
};

exports.getAdminProduct = (req, res, next) => {
	Product.fetchAll((products)=> {
		res.render('./admin/product-list', {
			prods: products,
			hasProducts: products?.length>0,
			pageTitle: 'Products',
			path: '/admin/products'
		});
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, imageUrl, description, price);
	product.save();
	res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if(!editMode){
		res.redirect('/');
	}
	const id=req.params.productId;
	Product.findById(id,(product)=> {
		res.render('./admin/add-product-edit', {
			product: product,
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode
		});
	});
};