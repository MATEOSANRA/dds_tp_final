const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/estadios", async function (req, res, next) {
  // #swagger.tags = ['Estadios']
  // #swagger.summary = 'obtiene todos los Estadios'
  // consulta de Estadios con filtros y paginacion

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

  const Pagina = req.query.Pagina ?? 1;
  const TamPagina = 10;

  const { count, rows } = await db.Estadios.findAndCountAll({
    attributes: [
      "IdEstadio",
      "Nombre",
      "Capacidad",
      "FechaInauguracion",
      "Abono",
      "Activo",
      "IdProvincia",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamPagina, //Uyilizamos el -1 para que no skippee los 10 primeros registros
    limit: TamPagina
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/estadios/:id", async function (req, res, next) {
  // #swagger.tags = ['Estadios']
  // #swagger.summary = 'obtiene un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  let items = await db.Estadios.findOne({
    attributes: [
      "IdEstadio",
      "Nombre",
      "Capacidad",
      "FechaInauguracion",
      "Abono",
      "Activo",
      "IdProvincia",
    ],
    where: { IdEstadio: req.params.id },
  });
  if (items) {
    res.json(items);
  }
  else {
    res.status(404).json({ message: "No se ha encontrado el estadio" })
  }
});

router.post("/api/estadios/", async (req, res) => {
  // #swagger.tags = ['estadios']
  // #swagger.summary = 'agrega un estadios'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Carnet',
                schema: { $ref: '#/definitions/estadios' }
    } */
  try {
    let data = await db.Estadios.create({
      Nombre: req.body.Nombre,
      Capacidad: req.body.Capacidad,
      FechaInauguracion: req.body.FechaInauguracion,
      Abono: req.body.Abono,
      Activo: req.body.Activo,
      IdProvincia: req.body.IdProvincia,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/estadios/:id", async (req, res) => {
  // #swagger.tags = ['estadios']
  // #swagger.summary = 'actualiza un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  /*    #swagger.parameters['Carnet'] = {
                in: 'body',
                description: 'Carnet a actualizar',
                schema: { $ref: '#/definitions/estadios' }
    } */

  try {
    let item = await db.Estadios.findOne({
      attributes: [
        "IdEstadio",
        "Nombre",
        "Capacidad",
        "FechaInauguracion",
        "Abono",
        "Activo",
        "IdProvincia",
      ],
      where: { IdEstadio: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Capacidad = req.body.Capacidad;
    item.FechaInauguracion = req.body.FechaInauguracion;
    item.Abono = req.body.Abono;
    item.Activo = req.body.Activo;
    item.IdProvincia = req.body.IdProvincia;
    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/estadios/:id", async (req, res) => {
  // #swagger.tags = ['estadios']
  // #swagger.summary = 'elimina un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Estadios.destroy({
      where: { IdEstadio: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE estadios SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdEstadio = :IdEstadio",
        {
          replacements: { IdEstadio: req.params.id },
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

// //------------------------------------
// //-- SEGURIDAD ---------------------------
// //------------------------------------
// router.get(
//   "/api/estadiosJWT",
//   auth.authenticateJWT,
//   async function (req, res, next) {
//     /* #swagger.security = [{
//                "bearerAuth1": []
//         }] */

//     // #swagger.tags = ['Articulos']
//     // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
//     const { rol } = res.locals.user;
//     if (rol !== "admin") {
//       return res.status(403).json({ message: "usuario no autorizado!" });
//     }

//     let items = await db.Estadios.findAll({
//       attributes: [
//         "IdEstadio",
//         "Nombre",
//         "Capacidad",
//         "FechaInauguracion",
//         "Abono",
//         "Activo",
//         "IdProvincia",
//       ],
//       order: [["Nombre", "ASC"]],
//     });
//     res.json(items);
//   }
// );


module.exports = router;

