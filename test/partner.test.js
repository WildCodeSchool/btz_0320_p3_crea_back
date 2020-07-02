const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Partner = require("../models/Partner");
const { adminToken, userToken } = require("../testSamples");
chai.use(chaiHtpp);

const partnerKeys = [
  "id",
  "label",
  "description",
  "url",
  "logo",
  "favorite",
  "createdAt",
  "updatedAt",
];

let partnerId;

describe("PARTNERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const partner = await Partner.create({
      label: " hello",
      description: "blablablabla",
      url: "Fine",
      logo: "Ends",
      favorite: "ok",
    });
    partnerId = partner.dataValues.id;
  });
  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/partners")
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
          .get("/api/v1/partners")
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
          .get(`/api/v1/partners/${partnerId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/partners/${partnerId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
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
          .post("/api/v1/partners")
          .send({
            label: " helscslo",
            description: "bcjkdsbckjdsbck",
            url: "Ficdscsne",
            logo: "Endcds",
            favorite: "favorite",
          })
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/partners")
          .send({ label: "Doe" })
          .set("Authorization", `Bearer ${adminToken}`);
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
          .post("/api/v1/partners")
          .send({
            label: "helscslo",
            description:"bcjsbckjds",
            url: "Ficdscsne",
            logo: "Endcds",
            favorite: "favorite",
          })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/partners")
          .send({ label: "Doe" })
          .set("Authorization", `Bearer ${userToken}`);
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
          .put(`/api/v1/partners/${partnerId}`)
          .send({ label: "bonjour" })
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(partnerKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/partners/${partnerId}`)
          .send({ label: "bonjour" })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
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
          .delete(`/api/v1/partners/${partnerId}`)
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
          .delete(`/api/v1/partners/${partnerId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
