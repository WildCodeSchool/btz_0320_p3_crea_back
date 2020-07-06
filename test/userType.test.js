const chai = require("chai");
const chaiHtpp = require("chai-http");
const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");
let should = chai.should();

let server = require("../index");

const UserType = require("../models/UserType");
const User = require("../models/User");
const ActivityField = require("../models/ActivityField");
const TypePost = require("../models/TypePost");
const Role = require("../models/Role");

chai.use(chaiHtpp);

let userTypeKeys = ["id", "label", "createdAt", "updatedAt"];
let userId;
let userTypeId;
let activityFieldId;
let userToken;
let adminToken;
let roleAdminId;
let roleUserId;

describe("USERS_TYPES", () => {
  before(async () => {
    await sequelize.sync({ force: true });
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
