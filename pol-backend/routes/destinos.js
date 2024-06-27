const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth"); 

router.get("/api/destinos", async function (req, res, next) {
  // #swagger.tags = ['destinos']
  // #swagger.summary = 'obtiene todos los destinos'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Abierto != undefined && req.query.Abierto !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Abierto = req.query.Abierto === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.destinos.findAndCountAll({
    attributes: [
      "Nombre",
      "Altura",
      "FechaMV",
      "Abierto",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/destinos/:nom", async function (req, res, next) {
  // #swagger.tags = ['destinos']
  // #swagger.summary = 'obtiene un destino'
  // #swagger.parameters['id'] = { description: 'identificador del destino...' }
  let items = await db.destinos.findOne({
    attributes: [
      "Nombre",
      "Altura",
      "IdProvincia",
      "FechaMV",
      "Abierto",
    ],
    where: { Nombre: req.params.nom },
  });
  res.json(items);
});

router.post("/api/destinos/", async (req, res) => {
  // #swagger.tags = ['destinos']
  // #swagger.summary = 'agrega un destino'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Artículo',
                schema: { $ref: '#/definitions/destinos' }
    } */
  try {
    let data = await db.destinos.create({
      Nombre: req.body.Nombre,
      Altura: req.body.Altura,
      IdProvincia: req.body.IdProvincia,
      FechaMV: req.body.FechaMV,
      Abierto: req.body.Abierto,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/destinos/:nom", async (req, res) => {
  // #swagger.tags = ['destinos']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['destino'] = {
                in: 'body',
                description: 'destino a actualizar',
                schema: { $ref: '#/definitions/destinos' }
    } */

  try {
    let item = await db.destinos.findOne({
      attributes: [
        "Nombre",
        "Altura",
        "IdProvincia",
        "FechaMV",
        "Abierto",
      ],
      where: { Nombre: req.params.nom },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Altura = req.body.Altura;
    item.IdProvincia = req.body.IdProvincia;
    item.FechaMV = req.body.FechaMV;
    item.Abierto = req.body.Abierto;
    await item.save();

    // otra forma de hacerlo
    // let data = await db.articulos.update(
    //   {
    //     Nombre: req.body.Nombre,
    //     Altura: req.body.Altura,
    //     IdProvincia: req.body.IdProvincia,
    //     FechaMV: req.body.FechaMV,
    //     Abierto: req.body.Abierto,
    //   },
    //   { where: { Nombre: req.params.nom } }
    // );
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/destinos/:nom", async (req, res) => {
  // #swagger.tags = ['destinos']
  // #swagger.summary = 'elimina un destino'
  // #swagger.parameters['id'] = { description: 'identificador del destino..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.destinos.destroy({
      where: { Iddestino: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE destinos SET Abierto = case when Abierto = 1 then 0 else 1 end WHERE Iddestino = :Iddestino",
        {
          replacements: { IdArticulo: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/destinosJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.destinos.findAll({
      attributes: [
        "Nombre",
        "Altura",
        "IdProvincia",
        "FechaMV",
        "Abierto",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);


module.exports = router;
