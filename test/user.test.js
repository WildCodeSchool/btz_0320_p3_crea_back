const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const User = require("../models/User");
const ActivityField = require("../models/ActivityField");
const UserType = require("../models/UserType");

chai.use(chaiHtpp);

let userSample = {
  lastName: "jean",
  firstName: "toto",
  email: "helloworld",
  password: "blablabla",
  localisation: "anglet",
  phone_number: 10940239,
  phone_number2: 58493029,
  isAdmin: false,
  schoolName: "HEC",
  companyName: "HEC",
  siret: "234536251",
  qualification: "metier",
  mobility: "USA",
  name_organisation: "ADIE",
  isActive: false,
  logo: "mlkdmlqksml.png",
};

let userKeys = [
  "id",
  "lastName",
  "firstName",
  "email",
  "password",
  "localisation",
  "phone_number",
  "phone_number2",
  "isAdmin",
  "schoolName",
  "companyName",
  "siret",
  "qualification",
  "mobility",
  "name_organisation",
  "isActive",
  "logo",
  "createdAt",
  "updatedAt",
  "ActivityFieldId",
  "UserTypeId",
];

describe("USERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    const activityField = await ActivityField.create({
      labelFr: "Bâtiment",
      labelEs: "Building",
      labelEus: "Eraikin",
    });

    activityFieldId = activityField.dataValues.id;

    const type = await UserType.create({ label: "chomeur" });

    userTypeId = type.dataValues.id;

    const user = await User.create({
      ...userSample,
      ActivityFieldId: activityFieldId,
      UserTypeId: userTypeId,
    });

    userId = user.dataValues.id;
  });

  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/users");
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
        const res = await chai.request(server).post("/api/v1/users").send({
          lastName: "jean",
          firstName: "toto",
          email: "helloworld",
          password: "blablabla",
          localisation: "anglet",
          phone_number: 10940239,
          phone_number2: 58493029,
          isAdmin: false,
          schoolName: "HEC",
          companyName: "HEC",
          siret: "234536251",
          qualification: "metier",
          mobility: "USA",
          name_organisation: "ADIE",
          isActive: false,
          logo: "mlkdmlqksml.png",
          ActivityFieldId: activityFieldId,
          UserTypeId: userTypeId,
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(userKeys);
      } catch (err) {
        throw err;
      }
    });
    it("Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/users")
          .send({ lastName: "Doe" });
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
          .put(`/api/v1/users/${userId}`)
          .send({ lastName: "georges" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(userKeys);
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
          .delete(`/api/v1/users/${userId}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
