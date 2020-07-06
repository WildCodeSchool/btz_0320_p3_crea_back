const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const sequelize = require("../sequelize");
let should = chai.should();
let server = require("../index");

const ActivityField = require("../models/ActivityField");
const User = require("../models/User");
const UserType = require("../models/UserType");
const Role = require("../models/Role");
const TypePost = require("../models/TypePost");

chai.use(chaiHttp);

const activityFieldKeys = [
  "id",
  "labelFr",
  "labelEs",
  "labelEus",
  "createdAt",
  "updatedAt",
];

let activityFieldId;
let userId;
let adminId;
let userTypeId;
let userToken;
let adminToken;
let roleAdminId;
let roleUserId;

describe("Activity field", () => {
  before(async () => {
    const type = await UserType.create({
      label: "chomeur",
    });
    userTypeId = type.dataValues.id;

    const roleAdmin = await Role.create({
      label: "ADMIN",
    });
    roleAdminId = roleAdmin.dataValues.id;

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
      email: "helloworld",
      password: "blablabla",
      localisation: "anglet",
      country: "France",
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
      UserTypeId: userTypeId,
      ActivityFieldId: activityFieldId,
      RoleId: roleUserId,
    });
    userId = user.dataValues.id;

    const admin = await User.create({
      lastName: "jean",
      firstName: "toto",
      email: "helloworld",
      password: "blablabla",
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
      RoleId: roleAdminId,
    });
    adminId = admin.dataValues.id;

    userToken = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: "USER",
        type: type.dataValues.label,
      },
      process.env.SECRET,
      { expiresIn: "3h" }
    );
    adminToken = jwt.sign(
      {
        id: admin.dataValues.id,
        email: admin.dataValues.email,
        role: "ADMIN",
        type: type.dataValues.label,
      },
      process.env.SECRET,
      { expiresIn: "3h" }
    );
  });

  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(2);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get("/api/v1/activityFields")
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(2);
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
          .get(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
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
          .post("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            labelFr: "Informatique",
            labelEs: "Data processing",
            labelEus: "Informatika",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/activityFields")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ question: "Doe ?" });
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
          .post("/api/v1/activityFields")
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
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ labelEs: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ hello: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(activityFieldKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/activityFields/${activityFieldId}`)
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
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/activityFields/${activityFieldId}`)
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
          .delete(`/api/v1/activityFields/${activityFieldId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
