const express = require("express");

// crear servidor
const app = express();

// Para recibir jsons
app.use(express.json()); // para poder leer json en el body

// crear base de datos si no existe
require("./base-orm/sqlite-init");  

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// ComidasFamiliasmock
const comidasfamiliasmockRouter = require("./routes/comidasfamiliasmock");
app.use(comidasfamiliasmockRouter);

// Comidas
const comidasRouter = require("./routes/comidas");
app.use(comidasRouter);

// Seguridad
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);


// levantar servidor
//const port = 3000;
//app.listen(port, () => {
//    console.log(`sitio escuchando en el puerto ${port}`);
//});
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  
