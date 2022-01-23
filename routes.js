const fs = require('fs');


const requestHandler = (req,res)=>{
    const url = req.url
    const method = req.method

    if(url === '/'){
        // Podemos setear a tipo content y que retorne un html
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>')
        res.write('</html>');
    
        // con esto deimos que ya no escribimos en la respuesta
        // y lo que escribimos se manda al cliente
        return res.end();
    }
    
    
    if(url === '/message' && method === 'POST'){
        // los request son Leidos por node en chunks, podemos empezar a leer la info del request
        // sin que haya llegado en un 100%. El request viene en un stream
    
        // no podemos asumir que todo el request va a estar disponible de entrada para eso+
        // debemos trabajar con buffers
        // para eso vamos a usar un even listener que dispare una función cada
        //vez que nos llegue un chunk para poder procesar su información
        const body=[];
        req.on('data', (chunk)=>{
            console.log(chunk);
            //agregamos todos los chunks al body
            body.push(chunk);
        });
        // hago return porque quiero que se registre el eventListener
        // pero no quiero que se ejecute el código que le sigue
        return req.on('end', ()=>{
            // una vez termina de llegar el request
            // unimos todas las partes de chunk 
            const parsedBody= Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
    
            // Escribir archivos con writeFileSync lo hace de forma sincrónica
            // Es decir bloquea el código hasta que se cree la fila y se escriba su contendido
            // Eso significa que la siguiente linea de este callback no se ejecuta hasta que termina
            // si entran nuevos request tampoco van a ser procesados hasta que termina el actual callback
    
            // la idea es usar el eventLoop sin bloquearlo para que el server este siempre disponible
            // dispatcheamos los errores y volvemos a procesarlos cuando están listos
            // siempre enviamos las respuestas o siguientes acciones dentro de callbacks
            // no es código que se ejecuta ahora sino en el futuro cuando la operación termina
    
            fs.writeFile('message.txt', message, (err)=>{
                // el código 302 es cuando hacemos redirecciones
                res.statusCode= 302;
                res.setHeader('Location','/');
                return res.end();
            });
           
        });
    
         
      
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>Mi pagina</title></head>');
    res.write('<body>Hola</body>')
    res.write('</html>');
    
    // con esto deimos que ya no escribimos en la respuesta
    // y lo que escribimos se manda al cliente
    res.end();
}

module.exports = requestHandler;