const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const UserType = require("../models/UserType");
const {
  adminToken,
  userToken,
} = require("../testSamples");

chai.use(chaiHtpp);

let userTypeKeys = ["id", "label", "createdAt", "updatedAt"]

describe("USERS_TYPES", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const userTypeTest = await UserType.create({
      label: "chomeur",
    });
    userTypeId = userTypeTest.dataValues.id
  });
  describe("GET ONE", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/userTypes/${userTypeId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys)
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/userTypes/${userTypeId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/userTypes")
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
        const res = await chai.request(server).get("/api/v1/userTypes")
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
        const res = await chai.request(server).post("/api/v1/userTypes").send({
          label: "new toto label",
        })        
        .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/userTypes").send({
          label: "new toto label",
        })        
        .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/userTypes")
          .send({ noLabel: "nolabel" })
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/userTypes")
          .send({ noLabel: "nolabel" })
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
        const res = await chai.request(server).put(`/api/v1/userTypes/${userTypeId}`).send({
          label: "Capitalist"
        })          
        .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys)
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai.request(server).put(`/api/v1/userTypes/${userTypeId}`).send({
          label: "Capitalist"
        })          
        .set("Authorization", `Bearer ${userToken}`);
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
        const res = await chai.request(server).delete(`/api/v1/userTypes/${userTypeId}`)
        .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai.request(server).delete(`/api/v1/userTypes/${userTypeId}`)
        .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
