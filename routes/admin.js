const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

// router es similar a app, solo que le registramos aca los handlers
// y exportamos router para que desde afuera se registre a app
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
	// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
	products.push({title: req.body.title});
	res.redirect('/');
});

exports.routes = router;
exports.products = products;
