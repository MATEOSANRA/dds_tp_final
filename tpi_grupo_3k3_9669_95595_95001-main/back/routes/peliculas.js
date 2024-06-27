const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/peliculas", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Peliculas.findAndCountAll({
    attributes: [
      "IdPelicula",
      "Nombre",
      "FechaPublicacion",
      "IdDirector",
      "Duracion",
      "Recaudacion",
    ],
    order: [["IdPelicula", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/peliculas/:id", async function (req, res, next) {
  let items = await db.Peliculas.findOne({
    attributes: [
      "IdPelicula",
      "Nombre",
      "FechaPublicacion",
      "IdDirector",
      "Duracion",
      "Recaudacion",
    ],
    where: { IdPelicula: req.params.id },
  });
  res.json(items);
});

router.post("/api/peliculas/", async (req, res) => {
  try {
    let data = await db.Peliculas.create({
      Nombre: req.body.Nombre,
      FechaPublicacion: req.body.FechaPublicacion,
      IdDirector: req.body.IdDirector,
      Duracion: req.body.Duracion,
      Recaudacion: req.body.Recaudacion,
    });
    res.status(200).json(data.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = "";
      err.errors.forEach(
        (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
      );
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

router.put("/api/peliculas/:id", async (req, res) => {
  try {
    let item = await db.Peliculas.findOne({
      attributes: [
        "IdPelicula",
        "Nombre",
        "FechaPublicacion",
        "IdDirector",
        "Duracion",
        "Recaudacion",
      ],
      where: { IdPelicula: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Película no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaPublicacion = req.body.FechaPublicacion;
    item.IdAutor = req.body.IdAutor;
    (item.Precio = req.body.Precio), (item.Disponible = req.body.Disponible);
    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = "";
      err.errors.forEach((x) => (messages += x.path + ": " + x.message + "\n"));
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------

router.get(
  "/api/peliculasJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Peliculas.findAll({
      attributes: [
        "IdPelicula",
        "Nombre",
        "FechaPublicacion",
        "IdDirector",
        "Duracion",
        "Recaudacion",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);

router.delete(
  "/api/peliculasJWTD/:id",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    const id = req.params.id;

    try {
      const pelicula = await db.Peliculas.findByPk(id);

      if (!pelicula) {
        return res
          .status(404)
          .json({ message: `Pelicula con ID ${id} no encontrada.` });
      }

      await pelicula.destroy();
      res.status(200).json({ message: `Pelicula con ID ${id} eliminada.` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
