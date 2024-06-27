const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/carnets", async function (req, res, next) {
  // #swagger.tags = ['Carnets']
  // #swagger.summary = 'obtiene todos los Carnets'
  // consulta de carnets con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === "true";
  }

  const { count, rows } = await db.carnets.findAndCountAll({
    attributes: [
      "IdCarnet",
      "Nombre",
      "ValorCuota",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],

  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/carnets/:id", async function (req, res, next) {
  // #swagger.tags = ['Carnets']
  // #swagger.summary = 'obtiene un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  let items = await db.carnets.findOne({
    attributes: [
      "IdCarnet",
      "Nombre",
      "ValorCuota",
      "CodigoDeBarra",
      "IdCarnetFamilia",
      "FechaAlta",
      "Activo",
    ],
    where: { IdCarnet: req.params.id },
  });
  res.json(items);
});

router.post("/api/carnets/", async (req, res) => {
  // #swagger.tags = ['Carnets']
  // #swagger.summary = 'agrega un Carnets'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Carnet',
                schema: { $ref: '#/definitions/Carnets' }
    } */
  try {
    let data = await db.carnets.create({
      Nombre: req.body.Nombre,
      ValorCuota: req.body.ValorCuota,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdCarnetFamilia: req.body.IdCarnetFamilia,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
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

router.put("/api/carnets/:id", async (req, res) => {
  // #swagger.tags = ['Carnets']
  // #swagger.summary = 'actualiza un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  /*    #swagger.parameters['Carnet'] = {
                in: 'body',
                description: 'Carnet a actualizar',
                schema: { $ref: '#/definitions/Carnets' }
    } */

  try {
    let item = await db.carnets.findOne({
      attributes: [
        "IdCarnet",
        "Nombre",
        "ValorCuota",
        "CodigoDeBarra",
        "IdCarnetFamilia",
        "FechaAlta",
        "Activo",
      ],
      where: { IdCarnet: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.ValorCuota = req.body.ValorCuota;
    item.CodigoDeBarra = req.body.CodigoDeBarra;
    item.IdCarnetFamilia = req.body.IdCarnetFamilia;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;
    await item.save();

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

router.delete("/api/carnets/:id", async (req, res) => {
  // #swagger.tags = ['Carnets']
  // #swagger.summary = 'elimina un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.carnets.destroy({
      where: { IdCarnet: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE carnets SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdCarnet = :IdCarnet",
        {
          replacements: { IdCarnet: +req.params.id },
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
    "/api/carnetsJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['Articulos']
      // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { permiso } = res.locals.user;
      if (permiso !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.carnets.findAll({
        attributes: [
          "IdCarnet",
          "Nombre",
          "ValorCuota",
          "CodigoDeBarra",
          "IdCarnetFamilia",
          "FechaAlta",
          "Activo",
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );
    

module.exports = router;
