const products = [];
const fs = require('fs');
const path = require('path');

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json'
);


module.exports = class Products {
	constructor(title) {
		this.title = title;
	}

	save(){
		fs.readFile(p, (err, fileContent)=> {
			let products = [];
			if(!err) {
				products = JSON.parse(fileContent);
			}
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err)=>{
				console.log(err);
			});
		});

	}

	// como esto es codigo asincrono no podemos asumir que cuando pedimos la pagina
	// se termino de ejecutar la funcion. Para eso pasamos un callback
	// dentro del callback lo que hacemos es renderizar la pagina dependiendo del lo que le pasamos
	// es decir producst
	static fetchAll(cb) {
	 	fs.readFile(p, (err, fileContent)=> {
			if(err) {
				cb([]);	
			}
			return cb(JSON.parse(fileContent));
		});
	}
};
