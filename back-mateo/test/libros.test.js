const request = require("supertest");
const app = require("../index");
const libroAlta = {
  Nombre: "Libro " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaPublicacion: new Date().toISOString(),
  IdAutor: 1,
  Precio: 100.00,
  Disponible: true,
};
const libroModificacion = {
  IdLibro: 1,
  Nombre: "Libro " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaPublicacion: new Date().toISOString(),
  IdAutor: 1,
  Precio: 100.00,
  Disponible: true,
};

// test route/libros GET
describe("GET /api/libros", () => {
  it("Deberia devolver todos los libros", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdLibro: expect.any(Number),
            Nombre: expect.any(String),
            FechaPublicacion: expect.any(String),
            Precio: expect.any(Number),
            Disponible: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/libros GET
describe("GET /api/libros con filtros", () => {
  it("Deberia devolver los libros según filtro ", async () => {
    const res = await request(app).get("/api/libros?Nombre=Bodas&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Bodas") ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/libros/:id GET
describe("GET /api/libros/:id", () => {
  it("Deberia devolver el libro con el id 1", async () => {
    const res = await request(app).get("/api/libros/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdLibro: expect.any(Number),
        Nombre: expect.any(String),
        FechaPublicacion: expect.any(String),
        IdAutor: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/libros POST
describe("POST /api/libros", () => {
  it("Deberia devolver el libro que acabo de crear", async () => {
    const res = await request(app).post("/api/libros").send(libroAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdLibro: expect.any(Number),
        Nombre: expect.any(String),
        FechaPublicacion: expect.any(String),
        IdAutor: expect.any(Number),
        Precio: expect.any(Number),
        Disponible: expect.any(Boolean)
      })
    );
  });
});

// test route/libros/:id PUT
describe("PUT /api/libros/:id", () => {
  it("Deberia devolver el libro con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/libros/1")
      .send(libroModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/libros/:id DELETE
describe("DELETE /api/libros/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/libros/1");
    expect(res.statusCode).toEqual(200);

  });
});

