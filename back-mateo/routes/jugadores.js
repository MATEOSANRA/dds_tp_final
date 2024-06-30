const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/jugadores", async function (req, res, next) {
  // #swagger.tags = ['Jugadores']
  // #swagger.summary = 'obtiene todos los Jugadores'
  // consulta de Jugadores con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  if (req.query.Retirado != undefined && req.query.Retirado !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Retirado = req.query.Retirado === "true";
  }

  const Pagina = req.query.Pagina ?? 1
  const TamPagina = 10;

  const { count, rows } = await db.Jugadores.findAndCountAll({
    attributes: [
      "IdJugador",
      "Nombre",
      "FechaNacimiento",
      "IdPosicion",
      "Retirado",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamPagina,
    limit: TamPagina
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/jugadores/:id", async function (req, res, next) {
  // #swagger.tags = ['Jugadores']
  // #swagger.summary = 'obtiene un jugador'
  // #swagger.parameters['id'] = { description: 'identificador del jugador...' }
  let items = await db.Jugadores.findOne({
    attributes: [
      "IdJugador",
      "Nombre",
      "FechaNacimiento",
      "IdPosicion",
      "Retirado",
    ],
    where: { IdJugador: req.params.id },
  });
  if (items) {
    res.json(items);
  }
  else {
    res.status(404).json({ message: "No se ha encontrado el jugador" })
  }
});

router.post("/api/jugadores/", async (req, res) => {
  // #swagger.tags = ['jugadores']
  // #swagger.summary = 'agrega un jugadores'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo jugador',
                schema: { $ref: '#/definitions/jugadores' }
    } */
  try {
    let data = await db.Jugadores.create({
      Nombre: req.body.Nombre,
      IdPosicion: req.body.IdPosicion,
      FechaNacimiento: req.body.FechaNacimiento,
      Retirado: req.body.Retirado,
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

router.put("/api/jugadores/:id", async (req, res) => {
  // #swagger.tags = ['jugadores']
  // #swagger.summary = 'actualiza un jugador'
  // #swagger.parameters['id'] = { description: 'identificador del jugador...' }
  /*    #swagger.parameters['jugador'] = {
                in: 'body',
                description: 'jugador a actualizar',
                schema: { $ref: '#/definitions/jugadores' }
    } */

  try {
    let item = await db.Jugadores.findOne({
      attributes: [
        "IdJugador",
        "Nombre",
        "FechaNacimiento",
        "IdPosicion",
        "Retirado",
      ],
      where: { IdJugador: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.IdPosicion = req.body.IdPosicion;
    item.FechaNacimiento = req.body.FechaNacimiento;
    item.Retirado = req.body.Retirado;
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

router.delete("/api/jugadores/:id", async (req, res) => {
  // #swagger.tags = ['jugadores']
  // #swagger.summary = 'elimina un jugador'
  // #swagger.parameters['id'] = { description: 'identificador del jugador..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Jugadores.destroy({
      where: { IdJugador: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE jugadores SET Retirado = case when Retirado = 1 then 0 else 1 end WHERE IdJugador = :IdJugador",
        {
          replacements: { IdJugador: req.params.id },
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
// //-- SEGURIDAD -----------------------
// //------------------------------------
// router.get(
//     "/api/jugadoresJWT",
//     auth.authenticateJWT,
//     async function (req, res, next) {
//       /* #swagger.security = [{
//                  "bearerAuth1": []
//           }] */

//       // #swagger.tags = ['Articulos']
//       // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
//       const { rol } = res.locals.user;
//       if (rol !== "admin") {
//         return res.status(403).json({ message: "usuario no autorizado!" });
//       }

//       let items = await db.Jugadores.findAll({
//         attributes: [
//           "IdJugador",
//           "Nombre",
//           "FechaNacimiento",
//           "IdPosicion",
//           "Retirado",
//         ],
//         order: [["Nombre", "ASC"]],
//       });
//       res.json(items);
//     }
//   );


module.exports = router;
