const http = require('http');

const path = require('path');

const rootDir = require('./util/path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// con set podemos setear propiedades en el handler
// le podemos configurar que use un motor de templates definido
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));

const errorController = require('./controllers/error');
//importamos las rutas definidas en otros archivos
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded());

// como los routers son midlewares validos, se pueden usar dentro de app
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
