const express = require('express');
const router = express.Router();

let arr_ComidasFamiliasMock = [
  {
    "IdTipoComida": 1,
    "Nombre": "Italiana"
  },
  {
    "IdTipoComida": 2,
    "Nombre": "Mexicana"
  },
  {
    "IdTipoComida": 3,
    "Nombre": "China"
  },
  {
    "IdTipoComida": 4,
    "Nombre": "Japonesa"
  },
  {
    "IdTipoComida": 5,
    "Nombre": "China"
  }
];

router.get('/api/comidasfamiliasmock', async function (req, res) {
  res.json(arr_ComidasFamiliasMock);
});
module.exports = router;

router.get('/api/comidasfamiliasmock/:id', async function (req, res) {
    let comidaFamilia = arr_ComidasFamiliasMock.find(
      (x) => x.IdTipoComida == req.params.id
    );
    if (comidaFamilia) res.json(comidaFamilia);
    else res.status(404).json({ message: 'comidaFamilia no encontrado' });
  });

  
router.post('/api/comidasfamiliasmock/', (req, res) => {
    const { Nombre } = req.body;
    let comidaFamilia = {
      Nombre,
      IdTipoComida: Math.floor(Math.random()*100000),
    };
  
    // aqui agregar a la coleccion
    arr_ComidasFamiliasMock.push(comidaFamilia);
  
    res.status(201).json(comidaFamilia);
  });
  
  router.put('/api/articulosfamiliasmock/:id', (req, res) => {
    let comidaFamilia = arr_ComidasFamiliasMock.find(
      (x) => x.IdTipoComida == req.params.id
    );
  
    if (comidaFamilia) {
      const { Nombre } = req.body;
      comidaFamilia.Nombre = Nombre;
      res.json({ message: 'comidaFamilia actualizado' });
    } else {
      res.status(404).json({ message: 'comidaFamilia no encontrado' })
    }
  });

  router.delete('/api/comidasfamiliasmock/:id', (req, res) => {
    let comidaFamilia = arr_ComidasFamiliasMock.find(
      (x) => x.IdTipoComida == req.params.id
    );
  
    if (comidaFamilia) {
        arr_ComidasFamiliasMock = arr_ComidasFamiliasMock.filter(
        (x) => x.IdTipoComida != req.params.id
      );
      res.json({ message: 'comidaFamilia eliminado' });
    } else {
      res.status(404).json({ message: 'comidaFamilia no encontrado' })
    }
  });
  
  
