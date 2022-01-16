
// si no ponemos la ruta va a tratar de buscar un core module
// por ejemple en este caso usa el core module http en vez de 
// importar un archivo con ese nombre
const http = require('http');

// creteServer toma un request listener como argumento
// es una funccion que se ejecuta por cada request

// El requestListener recibe una request que es de tipo IncomingMessage
// y un response que es de tipo ServerResponse


// Lo podemos definir o simplemente pasarselo como funcion anonima

// Es una arquitectura eventDriven, cada vez que llega un req a nuestro server
// se ejecuta la funcion requestListener 

// el resultado final de la funcion createServer es un objeto tipo server
// que debemos guardar en una variable

const server = http.createServer((req, res)=>{
    console.log(req)
});

// server.listen() empieza el proceso que hace que nodejs
// no termine imnediatamente de correr sino que continua escuchando 
// requests

// Los paramametros que toma son el puerto, el nombre del host
// por default es localhost
server.listen(3000);