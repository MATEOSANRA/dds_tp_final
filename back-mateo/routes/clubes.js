const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/clubes", async function (req, res, next) {
  // #swagger.tags = ['Clubes']
  // #swagger.summary = 'obtiene todos los Clubes'
  // consulta de Clubes con filtros y paginacion

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

  const Pagina = req.query.Pagina ?? 1
  const TamPagina = 10;

  const { count, rows } = await db.Clubes.findAndCountAll({
    attributes: [
      "IdClub",
      "Nombre",
      "FechaFundacion",
      "IdLiga",
      "Abono",
      "Abierto",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamPagina,
    limit: TamPagina
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/clubes/:id", async function (req, res, next) {
  // #swagger.tags = ['Clubes']
  // #swagger.summary = 'obtiene un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  let items = await db.Clubes.findOne({
    attributes: [
      "IdClub",
      "Nombre",
      "FechaFundacion",
      "IdLiga",
      "Abono",
      "Abierto",
    ],
    where: { IdClub: req.params.id },
  });
  if (items) {
    res.json(items);
  }
  else {
    res.status(404).json({ message: "No se ha encontrado el club" })
  }
});

router.post("/api/clubes/", async (req, res) => {
  // #swagger.tags = ['clubes']
  // #swagger.summary = 'agrega un clubes'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Carnet',
                schema: { $ref: '#/definitions/clubes' }
    } */
  try {
    let data = await db.Clubes.create({
      Nombre: req.body.Nombre,
      Abono: req.body.Abono,
      IdLiga: req.body.IdLiga,
      FechaFundacion: req.body.FechaFundacion,
      Abierto: req.body.Abierto,
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

router.put("/api/clubes/:id", async (req, res) => {
  // #swagger.tags = ['clubes']
  // #swagger.summary = 'actualiza un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet...' }
  /*    #swagger.parameters['Carnet'] = {
                in: 'body',
                description: 'Carnet a actualizar',
                schema: { $ref: '#/definitions/clubes' }
    } */

  try {
    let item = await db.Clubes.findOne({
      attributes: [
        "IdClub",
        "Nombre",
        "FechaFundacion",
        "IdLiga",
        "Abono",
        "Abierto",
      ],
      where: { IdClub: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Abono = req.body.Abono;
    item.IdLiga = req.body.IdLiga;
    item.FechaFundacion = req.body.FechaFundacion;
    item.Abierto = req.body.Abierto;
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

router.delete("/api/clubes/:id", async (req, res) => {
  // #swagger.tags = ['clubes']
  // #swagger.summary = 'elimina un Carnet'
  // #swagger.parameters['id'] = { description: 'identificador del Carnet..' }


  //cambiar esta variable para cambiar de tipo de baja
  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Clubes.destroy({
      where: { IdClub: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE clubes SET Abierto = case when Abierto = 1 then 0 else 1 end WHERE IdClub = :IdClub",
        {
          replacements: { IdClub: req.params.id },
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
//   "/api/clubesJWT",
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

//     let items = await db.Clubes.findAll({
//       attributes: [
//         "IdClub",
//         "Nombre",
//         "FechaFundacion",
//         "IdLiga",
//         "Abono",
//         "Abierto",
//       ],
//       order: [["Nombre", "ASC"]],
//     });
//     res.json(items);
//   }
// );


module.exports = router;

