import request from "supertest";
import { expect } from "chai";
import { getApp } from "../src/app";
import { FBLog, App } from "@mchirico/fblog";

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

  it("Test fblog", async () => {
    interface DOC {
      desc: string;
      timeStamp?: string;
    }

    const databaseURL = "https://septapig.firebaseio.com";
    const db = App(databaseURL).firestore();
    const fbLog = new FBLog(db);

    const obs = fbLog.onSnapshot(
      "fblog",
      "action",
      "activate",
      "add",
      (doc: DOC) => {
        console.log("Document added...................callback:", doc?.desc);
      }
    );

    await fbLog.set("fblog", { action: "activate", desc: "temp changes..." });
    await obs();
  });
});
