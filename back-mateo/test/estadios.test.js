const request = require("supertest");
const app = require("../index");
const estadioAlta = {
  Nombre: "Estadio " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaInauguracion: new Date().toISOString(),
  Capacidad: 15000,
  IdProvincia: 1,
  Abono: 100.00,
  Activo: true,
};
const estadioModificacion = {
  IdEstadio: 1,
  Nombre: "Estadio " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaInauguracion: new Date().toISOString(),
  IdProvincia: 1,
  Capacidad: 15000,
  Abono: 100.00,
  Activo: true,
};

// test route/estadios GET
describe("GET /api/estadios", () => {
  it("Deberia devolver todos los estadios", async () => {
    const res = await request(app).get("/api/estadios");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdEstadio: expect.any(Number),
            Nombre: expect.any(String),
            Capacidad: expect.any(Number),
            FechaInauguracion: expect.any(String),
            Abono: expect.any(Number),
            IdProvincia: expect.any(Number),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/estadios GET
describe("GET /api/estadios con filtros", () => {
  it("Deberia devolver los estadios según filtro ", async () => {
    const res = await request(app).get("/api/estadios?Nombre=Bodas&Pagina=1");
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

// test route/estadios/:id GET
describe("GET /api/estadios/:id", () => {
  it("Deberia devolver el estadio con el id 1", async () => {
    const res = await request(app).get("/api/estadios/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEstadio: expect.any(Number),
        Nombre: expect.any(String),
        Capacidad: expect.any(Number),
        FechaInauguracion: expect.any(String),
        IdProvincia: expect.any(Number),
        Abono: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/estadios POST
describe("POST /api/estadios", () => {
  it("Deberia devolver el estadio que acabo de crear", async () => {
    const res = await request(app).post("/api/estadios").send(estadioAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEstadio: expect.any(Number),
        Nombre: expect.any(String),
        Capacidad: expect.any(Number),
        FechaInauguracion: expect.any(String),
        IdProvincia: expect.any(Number),
        Abono: expect.any(Number),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/estadios/:id PUT
describe("PUT /api/estadios/:id", () => {
  it("Deberia devolver el estadio con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/estadios/1")
      .send(estadioModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/estadios/:id DELETE
describe("DELETE /api/estadios/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/estadios/1");
    expect(res.statusCode).toEqual(200);

  });
});

