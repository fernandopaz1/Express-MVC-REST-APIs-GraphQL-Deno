// aca iría el codigo que maneja lo que ve el usario
const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');
const {appendFile} = require('fs');

router.get('/about', (req, res, next) => {
	res.send('<h1>Hola este es el about</h1>');
});

router.get('/', (req, res, next) => {
	// usando template engines no necesitamos construir el path
	// tampoco la extension ya que definimos el default template engine
	products = adminData.products;
	res.render('shop', {
		prods: products,
		pageTitle: 'Shop',
		path: '/'
	});
});

module.exports = router;
