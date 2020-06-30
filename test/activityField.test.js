const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const ActivityField = require("../models/ActivityField");
const User = require("../models/User");

chai.use(chaiHttp);

const activityFieldKeys = [
  "id",
  "labelFr",
  "labelEs",
  "labelEus",
  "createdAt",
  "updatedAt",
]

let activityFieldId;

describe("Activity field", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const activity = await ActivityField.create({
      labelFr: "Bâtiment",
      labelEs: "Building",
      labelEus: "Eraikin",
    });
    activityFieldId = activity.dataValues.id;
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/activityFields");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ONE", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get(`/api/v1/activityFields/${activityFieldId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/activityFields")
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
    it("Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/activityFields")
          .send({ question: "Doe ?" });
        res.should.have.status(404);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
  describe("PUT", () => {
    it("should success", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .send({ title: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("DELETE", () => {
    it("should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/activityFields/${activityFieldId}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
