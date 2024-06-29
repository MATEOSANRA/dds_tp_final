const request = require("supertest");
const app = require("../index");

describe("GET /api/provincias", function () {
  it("Devolveria todos los provincias", async function () {
    const res = await request(app)
      .get("/api/provincias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdProvincia: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/provincias/:id", function () {
  it("respond with json containing a single provincias", async function () {
    const res = await request(app)
      .get("/api/provincias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdProvincia: 1,
        Nombre: expect.any(String),
      })
    );
  });
});