const products = [];
const fs = require('fs');
const path = require('path');

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json'
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent)=> {
		if(err) {
			cb([]);	
		}else{
			cb(JSON.parse(fileContent));
		}
	});
}



module.exports = class Products {
	constructor(title) {
		this.title = title;
	}

	save(){
		// aca usamos una función que obtiene el array de productos
		// y ejecuta el callback sobre ese array.
		getProductsFromFile(products => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), err=>{
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
};
