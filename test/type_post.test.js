const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const TypePost = require("../models/TypePost");
const {
  adminToken,
  userToken,
} = require("../testSamples");

let typePost;

const typePostKeys = [
  "labelFr",
  "labelEs",
  "labelEus",
  "createdAt",
  "updatedAt",
  "id",
]

let typePostId;

chai.use(chaiHtpp);
describe("Types_Posts", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    typePost = await TypePost.create({
      labelFr: "partenariat",
      labelEs: "partenarias",
      labelEus: "partenariak",
    });
    typePostId =  typePost.dataValues.id;
  });

  //test request all
  describe("GET ALL", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/postTypes")
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
        const res = await chai.request(server).get("/api/v1/postTypes")
        .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  // test request one
  describe("GET ONE", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/postTypes/${typePostId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(typePostKeys)
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/api/v1/postTypes/${typePostId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(typePostKeys)
      } catch (err) {
        throw err;
      }
    });
  });

  // test post one
  describe("POST", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/postTypes")
          .send({
            labelFr: "partenariat",
            labelEs: "partenarias",
            labelEus: "partenariak",
          })
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(typePostKeys);
      } catch (err) {
        throw err;
      }
    });
    //test de fail to create
    it("ADMIN Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/postTypes")
          .send({
            labelFr:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
            labelEs:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
            labelEus:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
          })
          .set("Authorization", `Bearer ${adminToken}`);
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
          .post("/api/v1/postTypes")
          .send({
            labelFr: "partenariat",
            labelEs: "partenarias",
            labelEus: "partenariak",
          })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER Should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/api/v1/postTypes")
          .send({
            labelFr:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
            labelEs:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
            labelEus:
              "ldksjendhejfkdksjdkfjdncjdklskdjakzelazkezaezadsqdssqdsqfffdsfdsf",
          })
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  // test put
  describe("PUT", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/postTypes/${typePostId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys(typePostKeys)
      } catch (err) {
        throw err;
      }
    });
    it("USER should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/api/v1/postTypes/${typePostId}`)
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  //test delete
  describe("DELETE", () => {
    it("ADMIN should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/postTypes/${typePostId}`)
          .send("element deleted")
          .set("Authorization", `Bearer ${adminToken}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
    it("USER should success", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/api/v1/postTypes/${typePostId}`)
          .send("element deleted")
          .set("Authorization", `Bearer ${userToken}`);
        res.should.have.status(403);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
