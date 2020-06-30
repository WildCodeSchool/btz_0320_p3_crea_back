const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const UserType = require("../models/UserType");

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
    it("should return one usersType", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/userTypes/${userTypeId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/userTypes");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/userTypes").send({
          label: "new toto label",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys);
      } catch (err) {
        throw err;
      }
    });
    it("Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/userTypes")
          .send({ noLabel: "nolabel" });
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
        const res = await chai.request(server).put(`/api/v1/userTypes/${userTypeId}`).send({
          label: "Capitalist"
        });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(userTypeKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("DELETE", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).delete(`/api/v1/userTypes/${userTypeId}`)
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
