const request = require("supertest");
const app = require("../index");

describe("GET /api/autores", function () {
  it("Devolveria todos los autores", async function () {
    const res = await request(app)
      .get("/api/autores")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdAutor: expect.any(Number),
          Nombre: expect.any(String),
          FechaNacimiento: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/autores/:id", function () {
  it("respond with json containing a single autores", async function () {
    const res = await request(app)
      .get("/api/autores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdAutor: 1,
        Nombre: expect.any(String),
        FechaPublicacion: expect.any(String),
      })
    );
  });
});
