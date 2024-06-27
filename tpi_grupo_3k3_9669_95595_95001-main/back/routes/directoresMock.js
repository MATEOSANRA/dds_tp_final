const express = require("express");
const router = express.Router();

let arr_DirectoresMock = [
  {
    IdDirector: 1,
    Nombre: "Christopher Nolan",
    FechaNacimiento: "07/30/1970",
    PaisOrigen: "Reino Unido",
    NumPeliculasDirigidas: 10,
  },
  {
    IdDirector: 2,
    Nombre: "Francis Ford Coppola",
    FechaNacimiento: "04/07/1939",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 24,
  },
  {
    IdDirector: 3,
    Nombre: "Quentin Tarantino",
    FechaNacimiento: "03/27/1963",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 9,
  },
  {
    IdDirector: 4,
    Nombre: "Steven Spielberg",
    FechaNacimiento: "12/18/1946",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 33,
  },
  {
    IdDirector: 5,
    Nombre: "David Fincher",
    FechaNacimiento: "08/28/1962",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 11,
  },
  {
    IdDirector: 6,
    Nombre: "Robert Zemeckis",
    FechaNacimiento: "05/14/1952",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 20,
  },
  {
    IdDirector: 7,
    Nombre: "Lana Wachowski",
    FechaNacimiento: "06/21/1965",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 10,
  },
  {
    IdDirector: 8,
    Nombre: "Lilly Wachowski",
    FechaNacimiento: "12/29/1967",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 8,
  },
  {
    IdDirector: 9,
    Nombre: "Martin Scorsese",
    FechaNacimiento: "11/17/1942",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 25,
  },
  {
    IdDirector: 10,
    Nombre: "Frank Darabont",
    FechaNacimiento: "01/28/1959",
    PaisOrigen: "Hungría",
    NumPeliculasDirigidas: 5,
  },
  {
    IdDirector: 11,
    Nombre: "Peter Jackson",
    FechaNacimiento: "10/31/1961",
    PaisOrigen: "Nueva Zelanda",
    NumPeliculasDirigidas: 12,
  },
  {
    IdDirector: 12,
    Nombre: "George Lucas",
    FechaNacimiento: "05/14/1944",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 7,
  },
  {
    IdDirector: 13,
    Nombre: "Ridley Scott",
    FechaNacimiento: "11/30/1937",
    PaisOrigen: "Reino Unido",
    NumPeliculasDirigidas: 24,
  },
  {
    IdDirector: 14,
    Nombre: "James Cameron",
    FechaNacimiento: "08/16/1954",
    PaisOrigen: "Canadá",
    NumPeliculasDirigidas: 9,
  },
  {
    IdDirector: 15,
    Nombre: "Jonathan Demme",
    FechaNacimiento: "02/22/1944",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 18,
  },
  {
    IdDirector: 16,
    Nombre: "Roger Allers",
    FechaNacimiento: "06/29/1949",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 4,
  },
  {
    IdDirector: 17,
    Nombre: "Rob Minkoff",
    FechaNacimiento: "08/11/1962",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 8,
  },
  {
    IdDirector: 18,
    Nombre: "Michael Curtiz",
    FechaNacimiento: "12/24/1886",
    PaisOrigen: "Hungría",
    NumPeliculasDirigidas: 62,
  },
  {
    IdDirector: 19,
    Nombre: "Damien Chazelle",
    FechaNacimiento: "01/19/1985",
    PaisOrigen: "Estados Unidos",
    NumPeliculasDirigidas: 8,
  },
];

router.get("/api/directoresmock", async function (req, res) {
  res.json(arr_DirectoresMock);
});

router.get("/api/directoresmock/:id", async function (req, res) {
  let director = arr_DirectoresMock.find((x) => x.IdDirector == req.params.id);
  if (director) res.json(director);
  else res.status(404).json({ message: "director no encontrado" });
});

router.post("/api/directoresmock/", (req, res) => {
  const { Nombre } = req.body;
  let director = {
    Nombre,
    IdDirector: Math.floor(Math.random() * 100000),
  };

  // aqui agregar a la coleccion
  arr_DirectoresMock.push(director);

  res.status(201).json(director);
});

router.put("/api/directoresmock/:id", (req, res) => {
  let director = arr_DirectoresMock.find((x) => x.IdDirector == req.params.id);

  if (director) {
    const { Nombre } = req.body;
    director.Nombre = Nombre;
    res.json({ message: "director actualizado" });
  } else {
    res.status(404).json({ message: "director no encontrado" });
  }
});

router.delete("/api/directoresmock/:id", (req, res) => {
  let director = arr_DirectoresMock.find((x) => x.IdDirector == req.params.id);

  if (director) {
    arr_DirectoresMock = arr_DirectoresMock.filter(
      (x) => x.IdDirector != req.params.id
    );
    res.json({ message: "director eliminado" });
  } else {
    res.status(404).json({ message: "director no encontrado" });
  }
});

module.exports = router;
