const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const db = require("../base-orm/sequelize-init");

router.get("/api/posiciones", async function (req, res, next) {
  let data = await db.Posiciones.findAll({
    attributes: ["IdPosicion", "Nombre"],
  });
  res.json(data);
});

router.get("/api/posiciones/:id", async function (req, res, next) {
  // #swagger.tags = ['CarnetsFamilias']
  // #swagger.summary = 'obtiene un CarnetFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del CarnetsFamilias...' }
  let data = await db.Posiciones.findAll({
    attributes: ["IdPosicion", "Nombre"],
    where: { IdPosicion: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ message: 'No econtrado!!' })
});


//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/posicionesJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== "admin" && rol !== "adminJugadores") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Posiciones.findAll({
      attributes: [
        "IdPosicion",
        "Nombre",
      ],
      order: [["IdPosicion", "ASC"]],
    });
    res.json(items);
  }
);


module.exports = router;