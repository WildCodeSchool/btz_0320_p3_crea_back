const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const UserType = require("../models/UserType");

chai.use(chaiHtpp);
describe("USERS_TYPES", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    userTypeTest = await UserType.create({
      label: "chomeur",
    });
  });
  describe("Get One UserType", () => {
    it("should return one usersType", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/userTypes/${userTypeTest.id}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Get all UserTypes", () => {
    it("should return an array of usersTypes", async () => {
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
  describe("Post one userType", () => {
    it("should post a new userType", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/userTypes").send({
          label: "new toto label",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(["id", "label", "createdAt", "updatedAt"]);
      } catch (err) {
        throw err;
      }
    });
    it("Should fail to create", async () => {
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
  describe("Put UserTypes", () => {
    it("should return an array of usersTypes", async () => {
      try {
        const res = await chai.request(server).put(`/api/v1/userTypes/${userTypeTest.id}`).send({
          label: "Capitalist"
        });
        res.should.have.status(202);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Delete UserTypes", () => {
    it("should return an object of usersTypes", async () => {
      try {
        const res = await chai.request(server).delete(`/api/v1/userTypes/${userTypeTest.id}`)
        res.should.have.status(205);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
