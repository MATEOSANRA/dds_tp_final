const express = require("express");
const router = express.Router();

let arr_ArtistasMock = [
    {
      IdArtista: 1,
      Nombre: "Queen",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 15,
    },
    {
      IdArtista: 2,
      Nombre: "Eagles",
      PaisOrigen: "Estados Unidos",
      NumDeAlbums: 7,
    },
    {
      IdArtista: 3,
      Nombre: "Michael Jackson",
      PaisOrigen: "Estados Unidos",
      NumDeAlbums: 10,
    },
    {
      IdArtista: 4,
      Nombre: "AC/DC",
      PaisOrigen: "Australia",
      NumDeAlbums: 17,
    },
    {
      IdArtista: 5,
      Nombre: "Adele",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 4,
    },
    {
      IdArtista: 6,
      Nombre: "Ed Sheeran",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 6,
    },
    {
      IdArtista: 7,
      Nombre: "The Weeknd",
      PaisOrigen: "Canadá",
      NumDeAlbums: 5,
    },
    {
      IdArtista: 8,
      Nombre: "Mark Ronson",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 5,
    },
    {
      IdArtista: 9,
      Nombre: "Nirvana",
      PaisOrigen: "Estados Unidos",
      NumDeAlbums: 3,
    },
    {
      IdArtista: 10,
      Nombre: "Oasis",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 7,
    },
    {
      IdArtista: 11,
      Nombre: "The Beatles",
      PaisOrigen: "Reino Unido",
      NumDeAlbums: 13,
    },
    {
      IdArtista: 12,
      Nombre: "Eminem",
      PaisOrigen: "Estados Unidos",
      NumDeAlbums: 11,
    }
];

router.get("/api/artistasmock", async function (req, res) {
  res.json(arr_ArtistasMock);
});

router.get("/api/artistasmock/:id", async function (req, res) {
  let artista = arr_ArtistasMock.find((x) => x.IdArtista == req.params.id);
  if (artista) res.json(artista);
  else res.status(404).json({ message: "artista no encontrado" });
});

router.post("/api/artistasmock/", (req, res) => {
  const { Nombre } = req.body;
  let artista = {
    Nombre,
    IdArtista: Math.floor(Math.random() * 100000),
  };

  // aqui agregar a la coleccion
  arr_ArtistasMock.push(artista);

  res.status(201).json(artista);
});

router.put("/api/artistasmock/:id", (req, res) => {
  let artista = arr_ArtistasMock.find((x) => x.IdArtista == req.params.id);

  if (artista) {
    const { Nombre } = req.body;
    artista.Nombre = Nombre;
    res.json({ message: "artista actualizado" });
  } else {
    res.status(404).json({ message: "artista no encontrado" });
  }
});

router.delete("/api/artistasmock/:id", (req, res) => {
  let artista = arr_ArtistasMock.find((x) => x.IdArtista == req.params.id);

  if (artista) {
    arr_ArtistasMock = arr_ArtistasMock.filter(
      (x) => x.IdArtista != req.params.id
    );
    res.json({ message: "artista eliminado" });
  } else {
    res.status(404).json({ message: "artista no encontrado" });
  }
});

module.exports = router;
