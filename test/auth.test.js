const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const UserType = require("../models/UserType");
const Role = require("../models/Role");
const ActivityField = require("../models/ActivityField");
const User = require("../models/User");

chai.use(chaiHttp);

const loginKeys = ["token", "user"];

const registerKeys = [
  "id",
  "lastName",
  "firstName",
  "email",
  "password",
  "localisation",
  "country",
  "phone_number",
  "phone_number2",
  "schoolName",
  "companyName",
  "siret",
  "qualification",
  "mobility",
  "name_organisation",
  "isActive",
  "logo",
  "ActivityFieldId",
  "UserTypeId",
  "RoleId",
  "createdAt",
  "updatedAt",
];

let userId;
let userTypeId;
let activityFieldId;
let roleUserId;

describe("AUTH", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const type = await UserType.create({
      label: "chomeur",
    });
    userTypeId = type.dataValues.id;

    const roleUser = await Role.create({
      label: "USER",
    });
    roleUserId = roleUser.dataValues.id;

    const activityField = await ActivityField.create({
      labelFr: "Bâtiment",
      labelEs: "Building",
      labelEus: "Eraikin",
    });
    activityFieldId = activityField.dataValues.id;

    const user = await User.create({
      lastName: "jean",
      firstName: "toto",
      email: "jean@dev.com",
      password: "blabla",
      localisation: "anglet",
      country: "France",
      phone_number: 10940239,
      phone_number2: 58493029,
      schoolName: "HEC",
      companyName: "HEC",
      siret: "234536251",
      qualification: "metier",
      mobility: "USA",
      name_organisation: "ADIE",
      isActive: false,
      logo: "mlkdmlqksml.png",
      UserTypeId: userTypeId,
      ActivityFieldId: activityFieldId,
      RoleId: roleUserId,
    });
    userId = user.dataValues.id;
  });
  describe("POST", () => {
    it("login should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/auth/login")
          .send({ email: "jean@dev.com", password: "blabla" });
        res.body.should.be.a("object");
        res.should.have.status(200);
        res.body.should.have.keys(loginKeys);
      } catch (err) {
        throw err;
      }
    });
    it("login should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/auth/login")
          .send({ email: "je@dev.com", password: "blaba" });
        res.body.should.be.a("object");
        res.should.have.status(422);
      } catch (err) {
        throw err;
      }
    });
    it("register should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/auth/register")
          .send({
            lastName: "jean",
            firstName: "toto",
            email: "jean@dev.com",
            password: "blabla",
            localisation: "anglet",
            country: "France",
            phone_number: "10940239",
            phone_number2: "58493029",
            schoolName: "HEC",
            companyName: "HEC",
            siret: "234536251",
            qualification: "metier",
            mobility: "USA",
            name_organisation: "ADIE",
            isActive: false,
            logo: "mlkdmlqksml.png",
            UserTypeId: userTypeId,
            ActivityFieldId: activityFieldId,
            RoleId: roleUserId,
          });
        res.body.should.be.a("object");
        res.should.have.status(201);
        res.body.should.have.keys(registerKeys);
      } catch (err) {
        throw err;
      }
    });
    it("register should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/auth/register")
          .send({
            lastName: "jean",
            firstName: "toto",
          });
        res.body.should.be.a("object");
        res.should.have.status(422);
      } catch (err) {
        throw err;
      }
    });
    it("forget password should success", async () => {
        try {
          const res = await chai
            .request(server)
            .post("/api/v1/auth/forgetPassword")
            .send({ email: "jean@dev.com" });
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.keys(["success", "info"])
        } catch (err) {
          throw err;
        }
      });
      it("forget password should failed", async () => {
        try {
          const res = await chai
            .request(server)
            .post("/api/v1/auth/forgetPassword")
            .send({ email: "je@dev.com"});
          res.body.should.be.a("object");
          res.should.have.status(400);
        } catch (err) {
          throw err;
        }
      });
  });
});
