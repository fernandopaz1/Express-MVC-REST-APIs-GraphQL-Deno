const path = require('path')

// process es una variable que indica el proceso actual
/// es una variable global asi que no esnece
// mainModule se refiere a el modulos que inicio el proceso
// con filename accedemos al path de app.js
// con esto tenemos el path a la carpeta root del proyecto

// process.mainModule esta deprecado en vez usamos
// require.main.filename
module.exports = path.dirname(require.main.filename);