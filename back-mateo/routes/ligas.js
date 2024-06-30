const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const db = require("../base-orm/sequelize-init");

router.get("/api/ligas", async function (req, res, next) {
  let data = await db.Ligas.findAll({
    attributes: ["IdLiga", "Nombre"],
  });
  res.json(data);
});

router.get("/api/ligas/:id", async function (req, res, next) {
  // #swagger.tags = ['CarnetsFamilias']
  // #swagger.summary = 'obtiene un CarnetFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del CarnetsFamilias...' }
  let data = await db.Ligas.findAll({
    attributes: ["IdLiga", "Nombre"],
    where: { IdLiga: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ message: 'No econtrado!!' })
});


//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/ligasJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== "admin" && rol !== "adminClubes") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Ligas.findAll({
      attributes: [
        "IdLiga",
        "Nombre",
      ],
      order: [["IdLiga", "ASC"]],
    });
    res.json(items);
  }
);


module.exports = router;
