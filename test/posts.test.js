const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Post = require("../models/Post");
const UserType = require("../models/UserType");
const User = require("../models/User");
const JobCategory = require("../models/JobCategory");
const ActivityField = require("../models/ActivityField");
const activitiesFields = require("../api/v1/routes/activityFields.route");
const TypePost = require("../models/TypePost");

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
]

let userId;
let userTypeId;
let jobCategoryId;
let postId;
let activityFieldId;
let postTypeId;

describe("POSTS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const type = await UserType.create({
      label: "chomeur",
    });
    userTypeId = type.dataValues.id;

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
    });
    userId = user.dataValues.id;

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
  });

  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/posts");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ONE", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get(`/api/v1/posts/${postId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys)
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/api/v1/posts").send({
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
    it("should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/posts")
          .send({ title: "Doe" });
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
          .put(`/api/v1/posts/${postId}`)
          .send({ title: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(postKeys)
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
          .delete(`/api/v1/posts/${postId}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
