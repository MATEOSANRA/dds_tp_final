const express = require("express");
const router = express.Router();
const auth = require("../seguridad/auth");
const db = require("../base-orm/sequelize-init");

// los errores asyncronos, sino los controlamos, por defecto hacen caer el servidor
router.get("/api/provincias", async function (req, res, next) {
  let data = await db.Provincias.findAll({
    attributes: ["IdProvincia", "Nombre"],
  });
  res.json(data);
});

router.get("/api/provincias/:id", async function (req, res, next) {
  // #swagger.tags = ['Provincias']
  // #swagger.summary = 'obtiene una provincia'
  // #swagger.parameters['id'] = { description: 'identificador de la provincia...' }
  let data = await db.Provincias.findAll({
    attributes: ["IdProvincia", "Nombre"],
    where: { IdProvincia: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ message: 'No existe tal provincia...' })
});


//------------------------------------
//-- SEGURIDAD -----------------------
//------------------------------------
router.get(
  "/api/provinciasJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== "admin" && rol !== "adminEstadios") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.Provincias.findAll({
      attributes: [
        "IdProvincia",
        "Nombre",
      ],
      order: [["IdProvincia", "ASC"]],
    });
    res.json(items);
  }
);


module.exports = router;