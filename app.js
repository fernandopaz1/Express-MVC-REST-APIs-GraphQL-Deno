const http = require('http');

const path = require('path');

const rootDir = require('./util/path');

const express = require('express');
const bodyParser = require('body-parser');

// La librería exporta una función que inicia un nuevo objeto
// que guarda y maneja muchas cosas que antes teníamos que hacer a mano
const app = express();

// con set podemos setear propiedades en el handler
// le podemos configurar que use un motor de templates definido
app.set('view engine', 'pug');
app.set('views', 'views');

// si queremos servir archivos estaticos como css
// tenemos que hacerlo via express
// cualquier archivo que necesite lo va a buscar a public
app.use(express.static(path.join(rootDir, 'public')));

//importamos las rutas definidas en otros archivos
const adminData = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

// El método use permite agregar un middleware
// los middlewares son handlers que se ejecutan entre que llega
// el pedido y se enviá la respuesta
// req y res son los mismos de antes, pero next seria la siguiente
// función a ejecuta, es decir el siguiente middleware.

// como parsear el body es algo común a todos los middleware
// lo hacemos al principio sin una ruta en concreto
// lo cual aplica para todas las request
app.use(bodyParser.urlencoded());

// como los routers son midlewares validos, se pueden usar dentro de app
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// si ningun middleware atiende la llamada lo que podemos hacer
// es atraparlo con el middleware mas general, es decir sin url
// status es un metodo que se puede encadenar y setea el status
app.use((req, res, next) => {
	res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

// El valor que retorna la función express resulta ser también
// un requestHandler valido, por lo que lo podemos pasar como
// parámetro para la creación del server.

// app.listen se crea el server pasando this, es decir el request handler
// y pasa el argumento para indicar que puerto usamos

app.listen(3000);
