const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const Faq = require("../models/Faq");

chai.use(chaiHttp);
describe("FAQ", () => {
    before(async () => {
        await sequelize.sync({ force: true });
        await Faq.create({
            question: " How are You ?",
            answer: "Fine",
            language: "En",
        });
    });
    describe("Get all FAQ", () => {
        it("shoul return an array of faqs", async () => {
            try {
                const res = await chai.request(server).get("/faq");
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(1);
            } catch (err) {
                throw err;
            }
        });
    });
    describe("Post one faq", () => {
        it("should post a new faq", async () => {
            try {
                const res = await chai.request(server).post("/faq").send({
                    question: "Why Crea ?",
                    answer: "Beceause it's a great platform",
                    language: "Euskara",
                });
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.keys([
                    "id",
                    "question",
                    "answer",
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
                    .post("/faq")
                    .send({ question: "Doe ?" });
                res.should.have.status(422);
                res.body.should.be.a("object");
            } catch (err) {
                throw err;
            }
        });
    });
});
