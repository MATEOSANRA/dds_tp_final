const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/ligas", async function (req, res, next) {
  let data = await db.Ligas.findAll({
    attributes: ["IdLiga", "Nombre"],
  });
  res.json(data);
});


// los errores asyncronos, sino los controlamos, por defecto hacen caer el servidor!!!!
router.get(
    "/api/carnetsfamilias/testerrorasync",
    async function (req, res, next) {
      // #swagger.tags = ['CarnetsFamilias']
      // #swagger.summary = 'test error asincrono'
      // -----------------------------------
      // -----------------------------------
      // error asincrono, controlado para que pueda ser interceptado por controlador estandar de express
      // try {
      //   let data = await db.carnetsfamilias.findAll({
      //     attributes: ["CampoInexistenteParaGenerarUnError"],
      //   });
      //   res.json(data);
      //  } catch (error) {
      //    next(error);
      //  }
      // -----------------------------------
      // -----------------------------------
      // aun con "express-async-errors" , las promesas con error sin cath hacer caer el servidor!!!
      // db.carnetsfamilias
      //   .findAll({
      //     attributes: ["CampoInexistenteParaGenerarUnError"],
      //   })
      //   .then((data) => res.json(data));
      // -----------------------------------
      // -----------------------------------
      // con "express-async-errors" debermos usar async/await
      let data = await db.carnetsfamilias.findAll({
        attributes: ["CampoInexistenteParaGenerarUnError"],
      });
      res.json(data);
    }
  );
  
  router.get("/api/ligas/:id", async function (req, res, next) {
    // #swagger.tags = ['CarnetsFamilias']
    // #swagger.summary = 'obtiene un CarnetFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del CarnetsFamilias...' }
    let data = await db.Ligas.findAll({
      attributes: ["IdLiga", "Nombre"],
      where: { IdLiga: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({message:'No econtrado!!'})
  });
  
  router.post("/api/ligas/", async function (req, res, next) {
    // #swagger.tags = ['CarnetsFamilias']
    // #swagger.summary = 'agrega un CarnetFamilia'
    /*    #swagger.parameters['CarnetsFamilias'] = {
                  in: 'body',
                  description: 'nuevo CarnetsFamilias',
                  schema: { $ref: '#/definitions/CarnetsFamilias' }
      } */
  
    // controlamos los errores "esperables" para cambiar el texto para hacerlo amigable al usuario.
    // los errores inesperados siguen el camino habitual por el controlador global (loguear e informar)
    try {
      let data = await db.Ligas.create({
        Nombre: req.body.Nombre,
      });
      res.status(204).json(data);  // devolvemos el registro agregado!
    }  catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
  router.put("/api/ligas/:id", async function (req, res, next) {
    // #swagger.tags = ['CarnetsFamilias']
    // #swagger.summary = 'actualiza un CarnetFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del CarnetsFamilias...' }
    /*    #swagger.parameters['CarnetsFamilias'] = {
                  in: 'body',
                  description: 'CarnetsFamilias a actualizar',
                  schema: { $ref: '#/definitions/CarnetsFamilias' }
      } */
  
      try {
        let data = await db.Ligas
        .update(
          { Nombre: req.body.Nombre },
          { where: { IdLiga: req.params.id } }
        );
        res.sendStatus(200);
        //res.json(data);  // devolvemos el registro modificado!
      }  catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          let messages = '';
          err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
          res.status(400).json({message : messages});
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
    );
  
  router.delete("/api/ligas/:id", async function (req, res, next) {
    // #swagger.tags = ['CarnetsFamilias']
    // #swagger.summary = 'elimina un CarnetFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del CarnetsFamilias...' }
  
    let data = await db.Ligas
      .destroy({
        where: { IdLiga: req.params.id },
      });
      if (data==1) res.sendStatus(200);
      else res.sendStatus(404);
  });
  

module.exports = router;
