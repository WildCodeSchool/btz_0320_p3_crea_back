const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Faq = require("../models/Faq");

chai.use(chaiHttp);

let faqKeys = [
  "id",
  "question",
  "answer",
  "language",
  "createdAt",
  "updatedAt",
];

describe("FAQ", () => {
  before(async () => {
    await sequelize.sync({ force: true });
     const faq = await Faq.create({
      question: " How are You ?",
      answer: "Fine",
      language: "En",
    });
    faqId = faq.dataValues.id
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/faq");
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
        const res = await chai.request(server).get(`/api/v1/faq/${faqId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(faqKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/faq").send({
          question: "Why Crea ?",
          answer: "Beceause it's a great platform",
          language: "Euskara",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(faqKeys);
      } catch (err) {
        throw err;
      }
    });
    it("Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/faq")
          .send({ question: "Doe ?" });
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
          .put(`/api/v1/faq/${faqId}`)
          .send({ title: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(faqKeys)
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
          .delete(`/api/v1/faq/${faqId}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
