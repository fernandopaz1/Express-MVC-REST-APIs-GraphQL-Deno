const fs = require('fs');
const path = require('path');

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json'
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Products {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		// aca usamos una función que obtiene el array de productos
		// y ejecuta el callback sobre ese array.
		this.id = Math.random().toString();
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	// como esto es código asíncrono no podemos asumir que cuando pedimos la pagina
	// se termino de ejecutar la función. Para eso pasamos un callback
	// dentro del callback lo que hacemos es renderizar la pagina dependiendo del lo que le pasamos
	// es decir products
	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}

	static editById(id, cb) {
		getProductsFromFile((products) => {
			const prods = products.map((p) => {
				if (p.id === id) return cb();
				return p;
			});
			fs.writeFile(p, JSON.stringify(prods), (err) => {
				console.log(err);
			});
		});
	}
};
