// aca iría el codigo que maneja lo que ve el usario

const express = require('express')
const router = express.Router();


// si no planeamos mandarlo al next lo que debemos hacer es mandar un
// response
router.use((req, res, next)=>{
    console.log("in the midleware");
    next(); // llama al siguiente middleware
})

// si agrego un path lo tengo que poner antes
// esto es porque el primer path que hace match se ejecuta
// si ejecuto este y envio el html, el siguiente midleware nose ejecuta
// Pero si pongo un url mas generico como '/' al principio, este siempre
// machea y nunca lo van a hacer los demas 
// los midlewares que tienen que ser aplicados a todos los request va 
// antes que todos los que envian una respuesta
router.use('/about',(req, res, next)=>{
    console.log("in the second midleware");
    // res.send() por default setea un header con el tipo correcto
    res.send('<h1>Hola este es el about</h1>'); 
})



// app.use tiene varios overloads para poder usarla de dferentes formas
// dependiendo de los parametros que usamos
router.use((req, res, next)=>{
    console.log("in the second midleware");
    // res.send() por default setea un header con el tipo correcto
    res.send('<h1>Hola desde express</h1>'); 
})

module.exports = router