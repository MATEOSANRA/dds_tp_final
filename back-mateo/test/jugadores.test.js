const request = require("supertest");
const app = require("../index");
const jugadorAlta = {
  Nombre: "Jugador " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaNacimiento: new Date().toISOString(),
  IdPosicion: 1,
  Retirado: true,
};
const jugadorModificacion = {
  IdJugador: 1,
  Nombre: "Jugador " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  FechaNacimiento: new Date().toISOString(),
  IdPosicion: 1,
  Retirado: true,
};

// test route/jugadores GET
describe("GET /api/jugadores", () => {
  it("Deberia devolver todos los jugadores", async () => {
    const res = await request(app).get("/api/jugadores");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdJugador: expect.any(Number),
            Nombre: expect.any(String),
            FechaNacimiento: expect.any(String),
            Retirado: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/jugadores GET
describe("GET /api/jugadores con filtros", () => {
  it("Deberia devolver los jugadores según filtro ", async () => {
    const res = await request(app).get("/api/jugadores?Nombre=Bodas&Pagina=1");
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

// test route/jugadores/:id GET
describe("GET /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 1", async () => {
    const res = await request(app).get("/api/jugadores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdJugador: expect.any(Number),
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        IdPosicion: expect.any(Number),
        Retirado: expect.any(Boolean)
      })
    );
  });
});

// test route/jugadores POST
describe("POST /api/jugadores", () => {
  it("Deberia devolver el jugador que acabo de crear", async () => {
    const res = await request(app).post("/api/jugadores").send(jugadorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdJugador: expect.any(Number),
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        IdPosicion: expect.any(Number),
        Retirado: expect.any(Boolean)
      })
    );
  });
});

// test route/jugadores/:id PUT
describe("PUT /api/jugadores/:id", () => {
  it("Deberia devolver el jugador con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/jugadores/1")
      .send(jugadorModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/jugadores/:id DELETE
describe("DELETE /api/jugadores/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/jugadores/1");
    expect(res.statusCode).toEqual(200);

  });
});

