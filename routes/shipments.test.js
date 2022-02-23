"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });
  test("not valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 999,
      name: 4,
      addr: {},
      invalidArg: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(Object.keys(resp.body)).toContain("error");
    expect(resp.body.error.message.length).toEqual(5);
  });
});
