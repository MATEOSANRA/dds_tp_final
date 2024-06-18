const request = require("supertest");
const app = require("../index");
const carnetAlta = {
  Nombre: "Carnet " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  ValorCuota: 2500.0,
  CodigoDeBarra: "AA000AA",
  IdCarnetFamilia: 1,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};
const carnetModificacion = {
  IdArticulo: 1,
  Nombre: "Carnet " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  ValorCuota: 3100.0,
  CodigoDeBarra: "AA000AA",
  IdCarnetFamilia: 1,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

// test route/articulos GET
describe("GET /api/carnets", () => {
  it("Deberia devolver todos los carnets paginados", async () => {
    const res = await request(app).get("/api/carnets?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdCarnet: expect.any(Number),
            Nombre: expect.any(String),
            ValorCuota: expect.any(Number),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/articulos GET
describe("GET /api/carnets con filtros", () => {
  it("Deberia devolver los carnets según filtro ", async () => {
    const res = await request(app).get("/api/carnets?Nombre=FUTBOL&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("FUTBOL") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/articulos/:id GET
describe("GET /api/carnets/:id", () => {
  it("Deberia devolver el carnet con el id 1", async () => {
    const res = await request(app).get("/api/carnets/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCarnet: expect.any(Number),
        Nombre: expect.any(String),
        ValorCuota: expect.any(Number),
        CodigoDeBarra: expect.any(String),
        IdCarnetFamilia: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/carnets", () => {
  it("Deberia devolver el carnet que acabo de crear", async () => {
    const res = await request(app).post("/api/carnets").send(carnetAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCarnet: expect.any(Number),
        Nombre: expect.any(String),
        ValorCuota: expect.any(Number),
        CodigoDeBarra: expect.any(String),
        IdCarnetFamilia: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/carnets/:id", () => {
  it("Deberia devolver el carnet con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/carnets/1")
      .send(carnetModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/carnets/:id", () => {
  it("Debería devolver el carnet con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/carnets/1");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});

