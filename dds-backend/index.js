const express = require("express");

// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body
require("./base-orm/sqlite-init");  // crear base si no existe

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// conexion con el mock
const carnetsfamiliasmockRouter = require("./routes/carnetsfamiliasmock");
app.use(carnetsfamiliasmockRouter);

// conexion con la BD
const carnetsfamiliasRouter = require("./routes/carnetsfamilias");
app.use(carnetsfamiliasRouter);

// controlador ABMC
const carnetsRouter = require("./routes/carnets");
app.use(carnetsRouter);

// configurar servidor
/*
const cors = require("cors");
app.use(
  cors({
    origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
  })
);
*/

// seguriad y acceso
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

/*
// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
*/

// levantar server pero con testing
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  
  
