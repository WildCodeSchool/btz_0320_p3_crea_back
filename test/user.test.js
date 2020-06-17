const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const User = require("../models/User");

chai.use(chaiHtpp);
describe("USERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.create({
      lastName: "toto",
      firstName: "jean",
      email: "hello",
      password: "hellohe",
      localisation: "vielle",
      phone_number: 556325365,
      phone_number2: 558547854,
      isAdmin: true,
      schoolName: "wcs",
      companyName: "wcs",
      siret: "211680374",
      qualification: "job",
      mobility: "france",
      name_organisation: "wcs",
      isActive: false,
      logo: "bjisdckjs",
    });
  });
  describe("Get all users", () => {
    it("should return an array of users", async () => {
      try {
        const res = await chai.request(server).get("/users");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Post one user", () => {
    it("should post a new user", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/users")
          .send({ firstName: "John", lastName: "Doe" });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "firstName",
          "lastName",
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
          .post("/users")
          .send({ lastName: "Doe" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
