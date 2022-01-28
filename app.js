const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

// La librería exporta una función que inicia un nuevo objeto
// que guarda y maneja muchas cosas que antes teníamos que hacer a mano
const app = express();

//importamos las rutas definidas en otros archivos
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

// El método use permite agregar un midleware
// los midlewares son handlers que se ejecutan entre que llega
// el pedido y se enviá la respuesta
// req y res son los mismos de antes, pero next seria la siguiente
// función a ejecuta, es decir el siguiente middleware.


// como parsear el body es algo común a todos los middleware
// lo hacemos al principio sin una ruta en concreto 
// lo cual aplica para todas las request
app.use(bodyParser.urlencoded());


// como los routers son midlewares validos, se pueden usar dentro de app
app.use(adminRoutes);
app.use(shopRoutes);



// El valor que retorna la función express resulta ser también
// un requestHandler valido, por lo que lo podemos pasar como
// parámetro para la creación del server.

// app.listen se crea el server pasando this, es decir el request handler
// y pasa el argumento para indicar que puerto usamos

app.listen(3000);