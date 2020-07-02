const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const JobCategory = require("../models/JobCategory");
const { adminToken, userToken } = require("../testSamples");

chai.use(chaiHtpp);

let categoryKeys = [
  "id",
  "labelFr",
  "labelEs",
  "labelEus",
  "createdAt",
  "updatedAt",
];

let categoryId;

describe("JOB CATEGORY", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const category = await JobCategory.create({
      labelFr: "toto",
      labelEs: "jean",
      labelEus: "hello",
    });
    categoryId = category.dataValues.id;
  });
  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/jobCategories")
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
          .get("/api/v1/jobCategories")
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
    it(" ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/jobCategories/${categoryId}`)
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
          .get(`/api/v1/jobCategories/${categoryId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
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
          .post("/api/v1/jobCategories")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            labelFr: "marcel",
            labelEs: "pagnol",
            labelEus: "margaux",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(categoryKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/jobCategories")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ labelFr: "Doe" });
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
          .post("/api/v1/jobCategories")
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
          .put(`/api/v1/jobCategories/${categoryId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ labelFr: "wcs" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(categoryKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/jobCategories/${categoryId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ hello: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(categoryKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/jobCategories/${categoryId}`)
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
    it("should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/jobCategories/${categoryId}`)
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
          .delete(`/api/v1/activityFields/${categoryId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
