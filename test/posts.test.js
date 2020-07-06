const chai = require("chai");
const chaiHtpp = require("chai-http");
const jwt = require("jsonwebtoken");

let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");

const Post = require("../models/Post");
const UserType = require("../models/UserType");
const User = require("../models/User");
const JobCategory = require("../models/JobCategory");
const ActivityField = require("../models/ActivityField");
const TypePost = require("../models/TypePost");
const Role = require("../models/Role");

chai.use(chaiHtpp);

const postKeys = [
  "id",
  "title",
  "content",
  "localisation",
  "language",
  "createdAt",
  "updatedAt",
  "UserId",
  "TypePostId",
  "JobCategoryId",
];

let userId;
let adminId;
let userTypeId;
let jobCategoryId;
let postId;
let postId2;
let activityFieldId;
let postTypeId;
let userToken;
let adminToken;
let roleAdminId;
let roleUserId;

describe("POSTS", () => {
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

    const jobCategory = await JobCategory.create({
      labelFr: "toto",
      labelEs: "jean",
      labelEus: "hello",
    });
    jobCategoryId = jobCategory.dataValues.id;

    const typePost = await TypePost.create({
      labelFr: "partenariat",
      labelEs: "partenarias",
      labelEus: "partenariak",
    });

    postTypeId = typePost.dataValues.id;

    const post = await Post.create({
      title: "annonce",
      content: "blablabla",
      localisation: "dax",
      language: "anglais",
      UserId: userId,
      TypePostId: postTypeId,
      JobCategoryId: jobCategoryId,
    });

    postId = post.dataValues.id;

    const post2 = await Post.create({
      title: "annonce",
      content: "blabla",
      localisation: "dax",
      language: "anglais",
      UserId: adminId,
      TypePostId: postTypeId,
      JobCategoryId: jobCategoryId,
    });

    postId2 = post2.dataValues.id;


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
          .get("/api/v1/posts")
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
          .get("/api/v1/posts")
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
          .get(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
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
          .post("/api/v1/posts")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            title: "annonce2",
            content: "blablabla2",
            localisation: "dax2",
            language: "anglais2",
            UserId: userId,
            TypePostId: postTypeId,
            JobCategoryId: jobCategoryId,
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/posts")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            title: "annonce2",
          });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/posts")
          .set("Authorization", `Bearer ${userToken}`)
          .send({
            title: "annonce2",
            content: "blablabla2",
            localisation: "dax2",
            language: "anglais2",
            UserId: userId,
            TypePostId: postTypeId,
            JobCategoryId: jobCategoryId,
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/posts")
          .set("Authorization", `Bearer ${userToken}`)
          .send({
            title: "annonce2",
          });
        res.should.have.status(422);
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
          .put(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ title: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
      } catch (err) {
        throw err;
      }
    });
    it("ADMIN should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({ hello: 03223654765 });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/posts/${postId}`)
          .send({ title: "bonjour" })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys);
      } catch (err) {
        throw err;
      }
    });
    it("USER should failed (trying to update an unowned post)", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/posts/${postId2}`)
          .send({ title: "bonjour" })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(401);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should failed (sending wrong datas)", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/posts/${postId}`)
          .send({ hello: "bonjour" })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(422);
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
          .delete(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    // it("USER should failed", async () => {
    //   try {
    //     const res = await chai
    //       .request(server)
    //       .delete("/api/v1/posts/vdvdfvdf")
    //       .set("Authorization", `Bearer ${userToken}`);
    //     res.should.have.status(422);
    //     res.body.should.be.a("object");
    //   } catch (err) {
    //     throw err;
    //   }
    // });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/posts/${postId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
