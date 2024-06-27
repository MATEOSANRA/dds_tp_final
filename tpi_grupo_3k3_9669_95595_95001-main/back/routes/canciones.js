const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/canciones", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Canciones.findAndCountAll({
    attributes: [
      "IdCancion",
      "Nombre",
      "FechaLanzamiento",
      "IdArtista",
      "Duracion",
      "Genero",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/canciones/:id", async function (req, res, next) {
  let items = await db.Canciones.findOne({
    attributes: [
      "IdCancion",
      "Nombre",
      "FechaLanzamiento",
      "IdArtista",
      "Duracion",
      "Genero",
    ],
    where: { IdCancion: req.params.id },
  });
  res.json(items);
});

router.post("/api/canciones/", async (req, res) => {
  try {
    let data = await db.Canciones.create({
      Nombre: req.body.Nombre,
      FechaLanzamiento: req.body.FechaLanzamiento,
      IdArtista: req.body.IdArtista,
      Duracion: req.body.Duracion,
      Genero: req.body.Genero,
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

router.put("/api/canciones/:id", async (req, res) => {
  try {
    let item = await db.Canciones.findOne({
      attributes: [
        "IdCancion",
        "Nombre",
        "FechaLanzamiento",
        "IdArtista",
        "Duracion",
        "Genero",
      ],
      where: { IdCancion: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Cancion no encontrada" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaLanzamiento = req.body.FechaLanzamiento;
    item.IdArtista = req.body.IdArtista;
    item.Duracion= req.body.Duracion;
    item.Genero = req.body.Genero;
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
  "/api/cancionesJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Canciones.findAll({
      attributes: [
        "IdCancion",
        "Nombre",
        "FechaLanzamiento",
        "IdArtista",
        "Duracion",
        "Genero",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);

module.exports = router;
