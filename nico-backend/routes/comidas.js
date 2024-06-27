const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/comidas", async function (req, res, next) {
  // #swagger.tags = ['Comidas']
  // #swagger.summary = 'obtiene todos los Comidas'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Vencido != undefined && req.query.Vencido !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Vencido = req.query.Vencido === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.comidas.findAndCountAll({
    attributes: [
      "IdComida",
      "Nombre",
      "Precio",
      "Calorias",
      "FechaPreparado",
      "Vencido",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/comidas/:id", async function (req, res, next) {
  // #swagger.tags = ['Comidas']
  // #swagger.summary = 'obtiene un Comida'
  // #swagger.parameters['id'] = { description: 'identificador del Comida...' }
  let items = await db.comidas.findOne({
    attributes: [
      "IdComida",
      "Nombre",
      "Precio",
      "IdTipoComida",
      "Calorias",
      "FechaPreparado",
      "Vencido",
    ],
    where: { IdComida: req.params.id },
  });
  res.json(items);
});

router.post("/api/comidas/", async (req, res) => {
  // #swagger.tags = ['Comidas']
  // #swagger.summary = 'agrega un Comida'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Artículo',
                schema: { $ref: '#/definitions/Comidas' }
    } */
  try {
    let data = await db.comidas.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      IdTipoComida: req.body.IdTipoComida,
      Calorias: req.body.Calorias,
      FechaPreparado: req.body.FechaPreparado,
      Vencido: req.body.Vencido,
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

router.put("/api/comidas/:id", async (req, res) => {
  // #swagger.tags = ['Comidas']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Comida'] = {
                in: 'body',
                description: 'Comida a actualizar',
                schema: { $ref: '#/definitions/Comidas' }
    } */

  try {
    let item = await db.comidas.findOne({
      attributes: [
        "IdComida",
        "Nombre",
        "Precio",
        "IdTipoComida",
        "Calorias",
        "FechaPreparado",
        "Vencido",
      ],
      where: { IdComida: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
    item.IdTipoComida = req.body.IdTipoComida;
    item.Calorias = req.body.Calorias;
    item.FechaPreparado = req.body.FechaPreparado;
    item.Vencido = req.body.Vencido;
    await item.save();

    // otra forma de hacerlo
    // let data = await db.comidas.update(
    //   {
    //     Nombre: req.body.Nombre,
    //     Precio: req.body.Precio,
    //     IdTipoComida: req.body.IdTipoComida,
    //     Calorias: req.body.Calorias,
    //     FechaPreparado: req.body.FechaPreparado,
    //     Vencido: req.body.Vencido,
    //   },
    //   { where: { IdComida: req.params.id } }
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

router.delete("/api/comidas/:id", async (req, res) => {
  // #swagger.tags = ['Comidas']
  // #swagger.summary = 'elimina un Comida'
  // #swagger.parameters['id'] = { description: 'identificador del Comida..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.comidas.destroy({
      where: { IdComida: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE comidas SET Vencido = case when Vencido = 1 then 0 else 1 end WHERE IdComida = :IdComida",
        {
          replacements: { IdComida: +req.params.id },
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
module.exports = router;

