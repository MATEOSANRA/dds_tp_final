const request = require("supertest");
const app = require("../index");
const clubAlta = {
  Nombre: "Club " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaFundacion: new Date().toISOString(),
  IdLiga: 1,
  Abono: 100.00,
  Abierto: true,
};
const clubModificacion = {
  IdClub: 1,
  Nombre: "Club " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaFundacion: new Date().toISOString(),
  IdLiga: 1,
  Abono: 100.00,
  Abierto: true,
};

// test route/clubes GET
describe("GET /api/clubes", () => {
  it("Deberia devolver todos los clubes", async () => {
    const res = await request(app).get("/api/clubes");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdClub: expect.any(Number),
            Nombre: expect.any(String),
            FechaFundacion: expect.any(String),
            Abono: expect.any(Number),
            Abierto: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/clubes GET
describe("GET /api/clubes con filtros", () => {
  it("Deberia devolver los clubes según filtro ", async () => {
    const res = await request(app).get("/api/clubes?Nombre=Bodas&Pagina=1");
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

// test route/clubes/:id GET
describe("GET /api/clubes/:id", () => {
  it("Deberia devolver el club con el id 1", async () => {
    const res = await request(app).get("/api/clubes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdClub: expect.any(Number),
        Nombre: expect.any(String),
        FechaFundacion: expect.any(String),
        IdLiga: expect.any(Number),
        Abono: expect.any(Number),
        Abierto: expect.any(Boolean)
      })
    );
  });
});

// test route/clubes POST
describe("POST /api/clubes", () => {
  it("Deberia devolver el club que acabo de crear", async () => {
    const res = await request(app).post("/api/clubes").send(clubAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdClub: expect.any(Number),
        Nombre: expect.any(String),
        FechaFundacion: expect.any(String),
        IdLiga: expect.any(Number),
        Abono: expect.any(Number),
        Abierto: expect.any(Boolean)
      })
    );
  });
});

// test route/clubes/:id PUT
describe("PUT /api/clubes/:id", () => {
  it("Deberia devolver el club con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/clubes/1")
      .send(clubModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/clubes/:id DELETE
describe("DELETE /api/clubes/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/clubes/1");
    expect(res.statusCode).toEqual(200);

  });
});

