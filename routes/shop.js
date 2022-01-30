// aca iría el codigo que maneja lo que ve el usario
const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');
const { appendFile } = require('fs');

// si no planeamos mandarlo al next lo que debemos hacer es mandar un
// response
router.get((req, res, next)=>{
    next(); // llama al siguiente middleware
})

// si agrego un path lo tengo que poner antes
// esto es porque el primer path que hace match se ejecuta
// si ejecuto este y envio el html, el siguiente midleware nose ejecuta
// Pero si pongo un url mas generico como '/' al principio, este siempre
// machea y nunca lo van a hacer los demas 
// los midlewares que tienen que ser aplicados a todos los request va 
// antes que todos los que envian una respuesta
router.get('/about',(req, res, next)=>{
    // res.send() por default setea un header con el tipo correcto
    res.send('<h1>Hola este es el about</h1>'); 
})



// app.use tiene varios overloads para poder usarla de dferentes formas
// dependiendo de los parametros que usamos
router.get('/',(req, res, next)=>{
    // res.send() por default setea un header con el tipo correcto
    // join une la variable de entorno __dirname que tiene el paht
    // absoluto del proyecto con el path relativos del archivo
    // no usamos las / aca porque crea el path de forma que funcione 
    // tanto en windows como linux
   
    // usando template engines no necesitamos construir el path
    // tampoco la extension ya que definimos el default template engine
    res.render('shop')
})

module.exports = router