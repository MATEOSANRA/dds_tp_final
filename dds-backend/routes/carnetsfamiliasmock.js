const express = require('express');
const router = express.Router();

let arr_CarnetsFamiliasMock = [
    {
      "IdCarnetFamilia": 1,
      "Nombre": "FUTBOL"
    },
    {
      "IdCarnetFamilia": 2,
      "Nombre": "BASKET"
    },
    {
      "IdCarnetFamilia": 3,
      "Nombre": "VOLEY"
    },
    {
      "IdCarnetFamilia": 4,
      "Nombre": "HOCKEY"
    },
    {
      "IdCarnetFamilia": 5,
      "Nombre": "PADEL"
    },
    {
      "IdCarnetFamilia": 6,
      "Nombre": "TENIS"
    },
    {
      "IdCarnetFamilia": 7,
      "Nombre": "NATACION"
    },
    {
      "IdCarnetFamilia": 8,
      "Nombre": "PATIN"
    },
    {
      "IdCarnetFamilia": 9,
      "Nombre": "EQUITACION"
    },
    {
      "IdCarnetFamilia": 10,
      "Nombre": "GOLF"
    }
  ];

router.get('/api/carnetsfamiliasmock', async function (req, res) {
  res.json(arr_CarnetsFamiliasMock);
});

// Buscar modulo por id
router.get('/api/carnetsfamiliasmock/:id', async function (req, res) {
    let carnetFamilia = arr_CarnetsFamiliasMock.find(
      (x) => x.IdCarnetFamilia == req.params.id
    );
    if (carnetFamilia) res.json(carnetFamilia);
    else res.status(404).json({ message: 'carnetFamilia no encontrado' });
  });

// Agregar un modulo
router.post('/api/carnetsfamiliasmock/', (req, res) => {
    const { Nombre } = req.body;
    let carnetFamilia = {
      Nombre,
      IdCarnetFamilia: Math.floor(Math.random()*100000),
    };
  
    // aqui agregar a la coleccion
    arr_CarnetsFamiliasMock.push(carnetFamilia);
  
    res.status(201).json(carnetFamilia);
  });
  
// Modificar un modulo
router.put('/api/carnetsfamiliasmock/:id', (req, res) => {
    let carnetFamilia = arr_CarnetsFamiliasMock.find(
      (x) => x.IdCarnetFamilia == req.params.id
    );
  
    if (carnetFamilia) {
      const { Nombre } = req.body;
      carnetFamilia.Nombre = Nombre;
      res.json({ message: 'carnetfamilia actualizado' });
    } else {
      res.status(404).json({ message: 'carnetfamilia no encontrado' })
    }
  });
  
// Borrar un modulo
router.delete('/api/carnetsfamiliasmock/:id', (req, res) => {
    let carnetFamilia = arr_CarnetsFamiliasMock.find(
      (x) => x.IdCarnetFamilia == req.params.id
    );
  
    if (carnetFamilia) {
      arr_CarnetsFamiliasMock = arr_CarnetsFamiliasMock.filter(
        (x) => x.IdCarnetFamilia != req.params.id
      );
      res.json({ message: 'carnetfamilia eliminado' });
    } else {
      res.status(404).json({ message: 'carnetfamilia no encontrado' })
    }
  });
  

module.exports = router;
