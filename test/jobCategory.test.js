const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const JobCategory = require("../models/JobCategory");

chai.use(chaiHtpp);
describe("JOB CATEGORY", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await JobCategory.create({
      labelFr: "toto",
      labelEs: "jean",
      labelEus: "hello",
    });
  });
  describe("Get all job category", () => {
    it("should return an array of job category", async () => {
      try {
        const res = await chai.request(server).get("/users/post/jobCategory");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Post one job category", () => {
    it("should post a new user", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/users/post/jobCategory")
          .send({
            labelFr: "marcel",
            labelEs: "pagnol",
            labelEus: "margaux",
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
          .post("/users/post/jobCategory")
          .send({ labelFr: "Doe" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
