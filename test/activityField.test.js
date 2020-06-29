const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const ActivityField = require("../models/ActivityField");

chai.use(chaiHttp);
describe("Activity field", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await ActivityField.create({
      labelFr: "Bâtiment",
      labelEs: "Building",
      labelEus: "Eraikin",
    });
  });
  describe("Get all Activity field", () => {
    it("should return an array of Activity field", async () => {
      try {
        const res = await chai.request(server).get("/activityField");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Post one Activity field", () => {
    it("should post a new Activity field", async () => {
      try {
        const res = await chai.request(server).post("/activityField").send({
          labelFr: "Informatique",
          labelEs: "Data processing",
          labelEus: "Informatika",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "labelFr",
          "labelEs",
          "labelEus",
          "createdAt",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });
    it("Should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/activityField")
          .send({ question: "Doe ?" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
