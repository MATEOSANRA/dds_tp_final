const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/artistas", async function (req, res, next) {
  let data = await db.Artistas.findAll({
    attributes: ["IdArtista", "Nombre", "PaisOrigen","NumDeAlbums"],
  });
  res.json(data);
});


router.get("/api/artistas/:id", async function (req, res, next) {
    // #swagger.tags = ['Artistas']
    // #swagger.summary = 'obtiene un Artista'
    // #swagger.parameters['id'] = { description: 'identificador del Artista...' }
    let data = await db.Artistas.findAll({
      attributes: ["IdArtista", "Nombre", "PaisOrigen","NumDeAlbums"],
      where: { IdArtista: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No encontrado!!'})
  });

module.exports = router;

