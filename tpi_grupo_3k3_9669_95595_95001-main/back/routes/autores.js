const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/autores", async function (req, res, next) {
  let data = await db.Autores.findAll({
    attributes: ["IdAutor", "Nombre", "Nacionalidad", "FechaNacimiento"],
  });
  res.json(data);
});

router.get("/api/autores/:id", async function (req, res, next) {
  // #swagger.tags = ['Autores']
  // #swagger.summary = 'obtiene un Autor'
  // #swagger.parameters['id'] = { description: 'identificador del Autor...' }
  let data = await db.Autores.findAll({
    attributes: ["IdAutor", "Nombre", "Nacionalidad", "FechaNacimiento"],
    where: { IdAutor: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
