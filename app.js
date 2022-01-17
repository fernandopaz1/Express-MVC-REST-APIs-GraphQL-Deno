
// si no ponemos la ruta va a tratar de buscar un core module
// por ejemple en este caso usa el core module http en vez de 
// importar un archivo con ese nombre
const http = require('http');
const fs = require('fs');

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
    const url = req.url
    const method = req.method

    if(url === '/'){
        // Podemos setear a tipo content y que retorne un html
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submint">Submit</button></form></body>')
        res.write('</html>');

        // con esto deimos que ya no escribimos en la respuesta
        // y lo que escribimos se manda al cliente
        return res.end();
    }


    if(url === '/message' && method === 'POST'){
        // los request son leidos por node en chunks, podemos empezar a leer la info del request
        // sin que haya llegado en un 100%. El request viene en un stream

        // no podemos asumir que todo el request va a estar disponbible de entrada para eso+
        // debemos trabajar con buffers
        // para eso vamos a usar un even listener que dispare una funcion cada
        //vez que nos llegue un chunk para poder procesar su informacions
        const body=[];
        req.on('data', (chunk)=>{
            console.log(chunk);
            //agregamos todos los chunks al body
            body.push(chunk);
        });
        req.on('end', ()=>{
            // una vez termina de llegar el request
            // unimos todas las partes de chunk 
            const parsedBody= Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

         
        // el codigo 302 es cuando hacemos redirecciones
        res.statusCode= 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>Mi pagina</title></head>');
    res.write('<body>Hola</body>')
    res.write('</html>');

    // con esto deimos que ya no escribimos en la respuesta
    // y lo que escribimos se manda al cliente
    res.end();
    
});

// server.listen() empieza el proceso que hace que nodejs
// no termine imnediatamente de correr sino que continua escuchando 
// requests

// Los paramametros que toma son el puerto, el nombre del host
// por default es localhost
server.listen(3000);

// esto lo que hace es iniciar un event Loop manejado por node
// Esto lo mantiene corriendo siempre y cuando haya eventListeners registrados en el event Loop

// toda nuestra aplicacion es manejada por este evenLoop, node usa el aproach
// de evenLoop no solo para el server sino para muchas otras cosas mas

// Esto es importanto ya que node es single thrad, es decir que todos los proceso en node usan el mismo hilo
// sin embargo con node podemos manejar miles de request
// esto sucede porque solo se ejecuta codig cuando un cierto event curre, dejando libre el thread cuando no ocurre

// con process.exit() nos desregistramos del evenLoop cerrando el server si no hay otros listeners

