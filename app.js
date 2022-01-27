const http = require('http');

const express = require('express');

// La librería exporta una función que inicia un nuevo objeto
// que guarda y maneja muchas cosas que antes teníamos que hacer a mano
const app = express();

// El método use permite agregar un midleware
// los midlewares son handlers que se ejecutan entre que llega
// el pedido y se enviá la respuesta
// req y res son los mismos de antes, pero next seria la siguiente
// función a ejecuta, es decir el siguiente midleware.

// si no planeamos mandarlo al next lo que debemos hacer es mandar un
// response
app.use((req, res, next)=>{
    console.log("in the midleware");
    next(); // llama al siguiente midleware4
})


app.use((req, res, next)=>{
    console.log("in the second midleware");
    // res.send() por default setea un header con el tipo correcto
    res.send('<h1>Hola desde express</h1>'); 
})

// El valor que retorna la función express resulta ser también
// un requestHandler valido, por lo que lo podemos pasar como
// parámetro para la creación del server.

// app.listen se crea el server pasando this, es decir el request handler
// y pasa el argumento para indicar que puerto usamos
app.listen(3000);