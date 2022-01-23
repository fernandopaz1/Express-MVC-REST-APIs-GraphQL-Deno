
// si no ponemos la ruta va a tratar de buscar un core module
// por ejemple en este caso usa el core module http en vez de 
// importar un archivo con ese nombre
const http = require('http');


const routes = require('./routes');

// creteServer toma un request listener como argumento
// es una function que se ejecuta por cada request

// El requestListener recibe una request que es de tipo IncomingMessage
// y un response que es de tipo ServerResponse


// Lo podemos definir o simplemente pasárselo como función anonima

// Es una arquitectura eventDriven, cada vez que llega un req a nuestro server
// se ejecuta la función requestListener 

// el resultado final de la función createServer es un objeto tipo server
// que debemos guardar en una variable

const server = http.createServer(routes);

// server.listen() empieza el proceso que hace que nodejs
// no termine inmediatamente de correr sino que continua escuchando 
// requests

// Los parámetros que toma son el puerto, el nombre del host
// por default es localhost
server.listen(3000);

// esto lo que hace es iniciar un event Loop manejado por node
// Esto lo mantiene corriendo siempre y cuando haya eventListeners registrados en el event Loop

// toda nuestra aplicación es manejada por este evenLoop, node usa el aproach
// de evenLoop no solo para el server sino para muchas otras cosas mas

// Esto es importante ya que node es single thread, es decir que todos los proceso en node usan el mismo hilo
// sin embargo con node podemos manejar miles de request
// esto sucede porque solo se ejecuta código cuando un cierto event curre, dejando libre el thread cuando no ocurre

// con process.exit() nos desregistramos del evenLoop cerrando el server si no hay otros listeners

