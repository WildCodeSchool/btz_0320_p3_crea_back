const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Post = require("../models/Post");

let post;

chai.use(chaiHtpp);
describe("POSTS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    post = await Post.create({
      title: "annonce",
      content: "blablabla",
      localisation: "dax",
      language: "anglais",
    });
  
  });
  describe("Get all users posts", () => {
    it("should return an array of users posts", async () => {
      try {
        const res = await chai.request(server).get("/users/posts");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Get one user's post", () => {
    it("should return an array of one user's posts", async () => {
      try {
        const res = await chai.request(server).get(`/users/posts/${post.id}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Post one users post", () => {
    it("should post a new user's post", async () => {
      try {
        const res = await chai.request(server).post("/users/posts").send({
          title: "annonce2",
          content: "blablabla2",
          localisation: "dax2",
          language: "anglais2",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "title",
          "content",
          "localisation",
          "language",
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
          .post("/users/posts")
          .send({ title: "Doe" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Put one user's post", () => {
    it("should put one user's post", async () => {
      try {
        const res = await await chai
          .request(server)
          .put(`/users/posts/${post.id}`);
        res.should.have.status(202);
        res.body.should.be.a("array");
      } catch (err) {
        throw err;
      }
    });
  });
  describe("Delete one user's post", () => {
    it("should delete one user's post", async () => {
      try {
        const res = await await chai.request(server).delete(`/users/posts/${post.id}`);
        res.should.have.status(205);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
