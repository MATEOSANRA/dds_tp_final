const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/comidasfamilias", async function (req, res, next) {
  let data = await db.comidasfamilias.findAll({
    attributes: ["IdTipoComida", "Nombre"],
  });
  res.json(data);
});

module.exports = router;
