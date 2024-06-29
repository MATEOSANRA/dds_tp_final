const request = require("supertest");
const app = require("../index");

describe("GET /api/ligas", function () {
  it("Devolveria todos los ligas", async function () {
    const res = await request(app)
      .get("/api/ligas")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdLiga: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/ligas/:id", function () {
  it("respond with json containing a single ligas", async function () {
    const res = await request(app)
      .get("/api/ligas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdLiga: 1,
        Nombre: expect.any(String),
      })
    );
  });
});
