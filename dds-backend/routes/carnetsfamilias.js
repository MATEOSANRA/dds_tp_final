const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/carnetsfamilias", async function (req, res, next) {
  let data = await db.carnetsfamilias.findAll({
    attributes: ["IdCarnetFamilia", "Nombre"],
  });
  res.json(data);
});

module.exports = router;
