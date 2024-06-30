const express = require("express");

// crear servidor
const app = express();

require("./base-orm/sqlite-init"); // crear base si no existe

app.use(express.json()); // para poder leer json en el body

const cors = require("cors");
app.use(
  cors({
    origin: "*"
  })
);

// express maneja archivos estaticos, esto nos permite unir al backend el codigo del frontend (que es estatico)
// lo cual lo logramos con al colocar el contenido del build de react en la carpeta public
/*
app.use(express.static('public'));
const path = require('path'); // Include path module
app.use((req, res, next) => {
  if (!req.url.startsWith('/api')) {
    // Manejar la solicitud
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    // Pasar la solicitud al siguiente middleware
    next();
  }
});
*/

// controlar ruta
app.get("/", (req, res) => {
  res.send("dds-backend iniciado!");
});


// Ruta de Clubes y Ligas

const clubesRouter = require("./routes/clubes");
app.use(clubesRouter);

const ligasRouter = require("./routes/ligas");
app.use(ligasRouter);


// Ruta de Jugadores y Posiciones

const jugadoresRouter = require("./routes/jugadores");
app.use(jugadoresRouter);

const posicionesRouter = require("./routes/posiciones");
app.use(posicionesRouter);


// Ruta de Estadios y Provincias

const estadiosRouter = require("./routes/estadios");
app.use(estadiosRouter);

const provinciasRouter = require("./routes/provincias");
app.use(provinciasRouter);


// Ruta de Seguridad

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

// levantar servidor
if (!module.parent) {
  // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000; // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto http://localhost:${port}`);
  });
}
module.exports = app; // para testing
