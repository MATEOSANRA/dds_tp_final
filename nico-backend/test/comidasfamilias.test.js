const request = require("supertest");
const app = require("../index");

describe("GET /api/comidasfamilias", function () {
  it("Devolveria todos las comidasfamilias", async function () {
    const res = await request(app)
      .get("/api/comidasfamilias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdTipoComida: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/comidasfamilias/:id", function () {
  it("respond with json containing a single comidasfamilias", async function () {
    const res = await request(app)
      .get("/api/comidasfamilias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdTipoComida: 1,
        Nombre: expect.any(String),
      })
    );
  });
});
