// aca van las rutas relacionadas a la administracion del sitio
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

// router es similar a app, solo que le registramos aca los handlers
// y exportamos router para que desde afuera se registre a app
const router = express.Router();

const products = [];

// app.get solo se dispara cuando hacemos un get request
// app.post se dispara solo cuando la llamada es un post
// app.use se dispara en ambos casos
router.get('/add-product', (req, res, next) => {
	res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect('/');
});

exports.routes = router;
exports.products = products;
