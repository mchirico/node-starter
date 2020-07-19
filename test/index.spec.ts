import request from "supertest";
import { expect } from "chai";
import { getApp } from "../src/app";

describe("App", () => {
  it("expect data", async () => {
    const app = getApp();
    const res = await request(app).get("/data");
    const { id, name } = res.body[0];

    console.log(res.body[0].id);
    console.log(res.body[0].name);
    expect(id).to.equal(11);
    expect(name).to.equal("Dr Nice");

    expect(res.status).to.equal(200);
  });

  it("expect train", async () => {
    const app = getApp();
    const res = await request(app).get("/trainview");
    const { lat, lon, trainno, service } = res.body[0];

    console.log(lat, lon, trainno, service);
    expect(+lat).to.be.gte(38);
    expect(+lon).to.be.lte(-70);
    expect(res.status).to.equal(200);
  });
});
