const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const Role = require("../models/Role");

chai.use(chaiHttp);

describe("ROLES", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await Role.create({
        label: "ADMIN",
      });
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/api/v1/role")
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
    
  });
     
});
