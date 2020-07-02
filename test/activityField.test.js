const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const ActivityField = require("../models/ActivityField");
const User = require("../models/User");
const { adminToken, userToken } = require("../testSamples");

chai.use(chaiHttp);

const activityFieldKeys = [
  "id",
  "labelFr",
  "labelEs",
  "labelEus",
  "createdAt",
  "updatedAt",
];

let activityFieldId;
let activity;

describe("Activity field", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    activity = await ActivityField.create({
      labelFr: "Bâtiment",
      labelEs: "Building",
      labelEus: "Eraikin",
    });
    activityFieldId = activity.dataValues.id;
  });
  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/activityFields")
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ONE", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            labelFr: "Informatique",
            labelEs: "Data processing",
            labelEus: "Informatika",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ question: "Doe ?" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/activityFields")
          .set("Authorization", `Bearer ${userToken}`)
          .send({
            labelFr: "Informatique",
            labelEs: "Data processing",
            labelEus: "Informatika",
          });
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
  describe("PUT", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ labelEs: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ hello: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${userToken}`)
          .send({ labelFr: "georges" });
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
  describe("DELETE", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`);

        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
