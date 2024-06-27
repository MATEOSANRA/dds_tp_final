const request = require("supertest");
const app = require("../index");
const comidaAlta = {
  Nombre: "Comida " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Precio: 10.5,
  IdTipoComida: 1,
  Calorias: 11,
  FechaPreparado: new Date().toISOString(),
  Vencido: true,
};
const comidaModificacion = {
  IdComida: 1,
  Nombre: "Comida " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Precio: 10.5,
  IdTipoComida: 1,
  Calorias: 11,
  FechaPreparado: new Date().toISOString(),
  Vencido: true,
};

// test route/comidas GET
describe("GET /api/comidas", () => {
  it("Deberia devolver todos los artículos paginados", async () => {
    const res = await request(app).get("/api/comidas?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdComida: expect.any(Number),
            Nombre: expect.any(String),
            Precio: expect.any(Number),
            Calorias: expect.any(Number),
            FechaPreparado: expect.any(String),
            Vencido: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/comidas GET
describe("GET /api/comidas con filtros", () => {
  it("Deberia devolver los comidas según filtro ", async () => {
    const res = await request(app).get("/api/comidas?Nombre=AIRE&Vencido=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("AIRE") || !array[i].Vencido ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/comidas/:id GET
describe("GET /api/comidas/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/comidas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdComida: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        IdTipoComida: expect.any(Number),
        Calorias: expect.any(Number),
        FechaPreparado: expect.any(String),
        Vencido: expect.any(Boolean),
      })
    );
  });
});

// test route/comidas POST
describe("POST /api/comidas", () => {
  it("Deberia devolver el comida que acabo de crear", async () => {
    const res = await request(app).post("/api/comidas").send(comidaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdComida: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        IdTipoComida: expect.any(Number),
        Calorias: expect.any(Number),
        FechaPreparado: expect.any(String),
        Vencido: expect.any(Boolean),
      })
    );
  });
});

// test route/comidas/:id PUT
describe("PUT /api/comidas/:id", () => {
  it("Deberia devolver el comida con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/comidas/1")
      .send(comidaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/comidas/:id DELETE
describe("DELETE /api/comidas/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/comidas/1");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdComida: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});
