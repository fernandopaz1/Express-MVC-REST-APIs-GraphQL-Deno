const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getCart = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		let cart = {products: [], totalPrice: 0};
		if (!err) {
			cart = JSON.parse(fileContent);
		}
		cb(cart);
	});
};

module.exports = class Cart {
	static addProduct(id, productPrice) {
		getCart((cart) => {
			productPrice = parseInt(productPrice);
			const existingProductIndex = cart.products.findIndex(
				(prod) => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = {...existingProduct};
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = {id: id, qty: 1};
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + productPrice;
			cart.products = [...cart.products];
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static fetchCart(cb) {
		getCart(cb);
	}
};
