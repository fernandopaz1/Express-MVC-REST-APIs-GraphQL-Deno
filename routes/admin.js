// aca van las rutas relacionadas a la administracion del sitio
const express = require('express')

// router es similar a app, solo que le registramos aca los handlers
// y exportamos router para que desde afuera se registre a app
const router = express.Router();

// app.get solo se dispara cuando hacemos un get request
// app.post se dispara solo cuando la llamada es un post
// app.use se dispara en ambos casos
router.get('/add-product', (req, res, next)=>{
    console.log("Un middleware con post");
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>'); 
})


router.post('/product', (req, res, next)=>{
    console.log(req.body)
    res.redirect('/');
})


module.exports = router