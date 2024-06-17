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

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
