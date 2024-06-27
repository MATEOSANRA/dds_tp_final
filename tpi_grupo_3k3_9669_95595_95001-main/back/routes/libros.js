const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");


router.get("/api/libros", async function (req, res, next) {
  // #swagger.tags = ['Libros']
  // #swagger.summary = 'obtiene todos los Libros'
  // consulta de libros con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.Libros.findAndCountAll({
    attributes: [
      "IdLibro",
      "Nombre",
      "FechaPublicacion",
      "IdAutor",
      "Precio",
      "Disponible",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/libros/:id", async function (req, res, next) {
  // #swagger.tags = ['Libros']
  // #swagger.summary = 'obtiene un Libros'
  // #swagger.parameters['id'] = { description: 'identificador del Libro...' }
  let items = await db.Libros.findOne({
    attributes: [
      "IdLibro",
      "Nombre",
      "FechaPublicacion",
      "IdAutor",
      "Precio",
      "Disponible",
    ],
    where: { IdLibro: req.params.id },
  });
  res.json(items);
});

router.post("/api/libros/", async (req, res) => {
  // #swagger.tags = ['Libros']
  // #swagger.summary = 'agrega un Libro'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Libro',
                schema: { $ref: '#/definitions/Libros' }
    } */
  try {
    let data = await db.Libros.create({
      Nombre: req.body.Nombre,
      FechaPublicacion: req.body.FechaPublicacion,
      IdAutor: req.body.IdAutor,
      Precio: req.body.Precio,
      Disponible: req.body.Disponible
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

router.put("/api/libros/:id", async (req, res) => {
  // #swagger.tags = ['Libross']
  // #swagger.summary = 'actualiza un Libro'
  // #swagger.parameters['id'] = { description: 'identificador del Libro...' }
  /*    #swagger.parameters['Libro'] = {
                in: 'body',
                description: 'Libro a actualizar',
                schema: { $ref: '#/definitions/Libros' }
    } */

  try {
    let item = await db.Libros.findOne({
      attributes: [
      "IdLibro",
      "Nombre",
      "FechaPublicacion",
      "IdAutor",
      "Precio",
      "Disponible",
      ],
      where: { IdLibro: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaPublicacion = req.body.FechaPublicacion;
    item.IdAutor = req.body.IdAutor;
    item.Precio = req.body.Precio,
    item.Disponible = req.body.Disponible;
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

router.delete("/api/libros/:id", async (req, res) => {
  // #swagger.tags = ['Libros']
  // #swagger.summary = 'elimina un Libro'
  // #swagger.parameters['id'] = { description: 'identificador del Libro..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Libros.destroy({
      where: { IdLibro: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE libros SET Disponible = case when Disponible = 1 then 0 else 1 end WHERE IdLibro = :IdLibro",
        {
          replacements: { IdLibro: +req.params.id },
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
    "/api/librosJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['Libros']
      // #swagger.summary = 'obtiene todos los Libros, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.Libros.findAll({
        attributes: [
          "IdLibro",
          "Nombre",
          "FechaPublicacion",
          "IdAutor",
          "Precio",
          "Disponible",
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );
  
module.exports = router;
