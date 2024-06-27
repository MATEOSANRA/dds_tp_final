const express = require("express");

// crear servidor
const app = express();

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial pol-backend!");
});

// Manejador destinos
const destinosRouter = require("./routes/destinos");
app.use(destinosRouter);

// Seguridad
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);


// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
