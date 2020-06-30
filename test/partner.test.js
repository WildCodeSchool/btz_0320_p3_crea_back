const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Partner = require("../models/Partner");

chai.use(chaiHtpp);

const partnerKeys = ["id", "label", "url", "logo", "createdAt", "updatedAt"];

describe("PARTNERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const partner = await Partner.create({
      label: " hello",
      url: "Fine",
      logo: "Ends",
    });
    partnerId = partner.dataValues.id;
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/partners");
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
        const res = await chai
          .request(server)
          .get(`/api/v1/partners/${partnerId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/partners").send({
          label: " helscslo",
          url: "Ficdscsne",
          logo: "Endcds",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
      } catch (err) {
        throw err;
      }
    });
    it("should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/partners")
          .send({ label: "Doe" });
        res.should.have.status(422);
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
          .put(`/api/v1/partners/${partnerId}`)
          .send({ label: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
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
          .delete(`/api/v1/partners/${partnerId}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
