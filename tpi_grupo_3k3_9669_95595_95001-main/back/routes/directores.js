const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/directores", async function (req, res, next) {
  let data = await db.Directores.findAll({
    attributes: [
      "IdDirector",
      "Nombre",
      "FechaNacimiento",
      "PaisOrigen",
      "NumPeliculasDirigidas",
    ],
  });
  res.json(data);
});

router.get("/api/directores/:id", async function (req, res, next) {
  let data = await db.Directores.findAll({
    attributes: [
      "IdDirector",
      "Nombre",
      "FechaNacimiento",
      "PaisOrigen",
      "NumPeliculasDirigidas",
    ],
    where: { IdDirector: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
