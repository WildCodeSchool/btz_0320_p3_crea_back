const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const UserType = require("../models/UserType");

chai.use(chaiHtpp);
describe("USERS_TYPES", () => {
    before(async () => {
        await sequelize.sync({ force: true });
        await UserType.create({
            label: "totoLabel",
        });
    });
    describe("Get all UserTypes", () => {
        it("should return an array of usersTypes", async () => {
            try {
                const res = await chai.request(server).get("/users/userTypes");
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(1);
            } catch (err) {
                throw err;
            }
        });
    });
    describe("Post one userType", () => {
        it("should post a new userType", async () => {
            try {
                const res = await chai
                    .request(server)
                    .post("/users/userTypes")
                    .send({
                        label: "new toto label",
                    });
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.keys([
                    "id",
                    "label",
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
                    .post("/users/userTypes")
                    .send({ noLabel: "nolabel" });
                res.should.have.status(422);
                res.body.should.be.a("object");
            } catch (err) {
                throw err;
            }
        });
    });
});
