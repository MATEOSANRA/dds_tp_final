const request = require("supertest");
const app = require("../index");

describe("GET /api/carnetsfamilias", function () {
  it("Devolveria todos los carnetsfamilias", async function () {
    const res = await request(app)
      .get("/api/carnetsfamilias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCarnetFamilia: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/carnetsfamilias/:id", function () {
  it("respond with json containing a single carnetsfamilias", async function () {
    const res = await request(app)
      .get("/api/carnetsfamilias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCarnetFamilia: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

