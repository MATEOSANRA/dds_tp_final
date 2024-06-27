const express = require('express');
const router = express.Router();

let arr_AutoresMock = [
  {
    "IdAutor": 1,
    "Nombre": "Edgar Allan Poe",
    "FechaNacimiento" : "01/19/1809"
  },
  {
    "IdAutor": 2,
    "Nombre": "Paulo Coelho",
    "FechaNacimiento" : "08/24/1947"
  },
  {
    "IdAutor": 3,
    "Nombre": "Charles Dickens",
    "FechaNacimiento" : "02/07/1812"
  },
  {
    "IdAutor": 4,
    "Nombre": "Federico García Lorca",
    "FechaNacimiento" : "06/05/1898"
  },
  {
    "IdAutor": 5,
    "Nombre": "Fiódor Dostoyevski",
    "FechaNacimiento" : "11/11/1821"
  },
  {
    "IdAutor": 6,
    "Nombre": "Julio Cortázar",
    "FechaNacimiento" : "02/26/1914"
  },
  {
    "IdAutor": 7,
    "Nombre": "Jorge Luis Borges",
    "FechaNacimiento" : "08/24/1899"
  },
  {
    "IdAutor": 8,
    "Nombre": "Franz Kafka",
    "FechaNacimiento" : "07/03/1883"
  },
  {
    "IdAutor": 9,
    "Nombre": "Albert Camus",
    "FechaNacimiento" : "11/07/1913"
  },
  {
    "IdAutor": 10,
    "Nombre": "Ernesto Sábato",
    "FechaNacimiento" : "06/24/1911"
  }
];

router.get('/api/autoresmock', async function (req, res) {
  res.json(arr_AutoresMock);
});

router.get('/api/autoresmock/:id', async function (req, res) {
  let autor = arr_AutoresMock.find(
    (x) => x.IdAutor == req.params.id
  );
  if (autor) res.json(autor);
  else res.status(404).json({ message: 'autor no encontrado' });
});

router.post('/api/autoresmock/', (req, res) => {
  const { Nombre } = req.body;
  let autor = {
    Nombre,
    IdAutor: Math.floor(Math.random()*100000),
  };

  // aqui agregar a la coleccion
  arr_AutoresMock.push(autor);

  res.status(201).json(autor);
});

router.put('/api/autoresmock/:id', (req, res) => {
  let autor = arr_AutoresMock.find(
    (x) => x.IdAutor == req.params.id
  );

  if (autor) {
    const { Nombre } = req.body;
    autor.Nombre = Nombre;
    res.json({ message: 'autor actualizado' });
  } else {
    res.status(404).json({ message: 'autor no encontrado' })
  }
});

router.delete('/api/autoresmock/:id', (req, res) => {
  let autor = arr_AutoresMock.find(
    (x) => x.IdAutor == req.params.id
  );

  if (autor) {
    arr_AutoresMock = arr_AutoresMock.filter(
      (x) => x.IdAutor != req.params.id
    );
    res.json({ message: 'autor eliminado' });
  } else {
    res.status(404).json({ message: 'autor no encontrado' })
  }
});


module.exports = router;