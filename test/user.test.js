const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
let server = require("../index");
const sequelize = require("../sequelize");
const User = require("../models/User");
const ActivityField = require("../models/ActivityField");
const UserType = require("../models/UserType");
const Role = require("../models/Role");
const {
    adminToken,
    userToken,
    adminSample,
    userSample,
} = require("../testSamples");

chai.use(chaiHtpp);

let userKeys = [
    "id",
    "lastName",
    "firstName",
    "email",
    "password",
    "localisation",
    "phone_number",
    "createdAt",
    "updatedAt",
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
];

let user;
let admin;
let type;
let userTypeId;
let activityField;
let activityFieldId;
let userId;
let adminRole;
let adminRoleId;

describe("USERS", () => {
    before(async () => {
        await sequelize.sync({ force: true });

        activityField = await ActivityField.create({
            labelFr: "Bâtiment",
            labelEs: "Building",
            labelEus: "Eraikin",
        });
        activityFieldId = activityField.dataValues.id;

        type = await UserType.create({ label: "chomeur" });
        userTypeId = type.dataValues.id;

        adminRole = await Role.create({ label: "ADMIN" });
        adminRoleId = adminRole.dataValues.id;

        userRole = await Role.create({ label: "USER" });
        userRoleId = userRole.dataValues.id;

        user = await User.create({
            ...userSample,
            ActivityFieldId: activityFieldId,
            UserTypeId: userTypeId,
            RoleId: userRoleId,
        });
        userId = user.dataValues.id;

        admin = await User.create({
            ...adminSample,
            ActivityFieldId: activityFieldId,
            UserTypeId: userTypeId,
            RoleId: adminRoleId,
        });
        adminId = admin.dataValues.id;
    });

    describe("GET ALL", () => {
        it("ADMIN should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .get("/api/v1/users")
                    .set("Authorization", `Bearer ${adminToken}`);
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(2);
            } catch (err) {
                throw err;
            }
        });

        it("USER should fail", async () => {
            try {
                const res = await chai
                    .request(server)
                    .get("/api/v1/users")
                    .set("Authorization", `Bearer ${userToken}`);
                res.should.have.status(403);
                res.body.should.be.a("object");
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
                    .get(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${adminToken}`);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .get(`/api/v1/users/${adminId}`)
                    .set("Authorization", `Bearer ${adminToken}`);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("USER should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .get(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${userToken}`);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("USER should fail", async () => {
            try {
                const res = await chai
                    .request(server)
                    .get("/api/v1/users/dklsqjdklqsjdlkaqkzldejzae")
                    .set("Authorization", `Bearer ${userToken}`);
                res.should.have.status(401);
                res.body.should.be.a("object");
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
                    .post("/api/v1/users")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send(adminSample);
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN Should fail", async () => {
            try {
                const res = await chai
                    .request(server)
                    .post("/api/v1/users")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ lastName: "Doe" });
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
                    .post("/api/v1/users")
                    .set("Authorization", `Bearer ${userToken}`)
                    .send(userSample);
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
                    .put(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(202);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .put(`/api/v1/users/${adminId}`)
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(202);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN should failed", async () => {
            try {
                const res = await chai
                    .request(server)
                    .put(`/api/v1/users/${adminId}`)
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ title: "georges" });
                res.should.have.status(202);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("USER should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .put(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(202);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("USER should fail", async () => {
            try {
                const res = await chai
                    .request(server)
                    .put(`/api/v1/users/daskldfjasdjklfhasdjhfsjkd`)
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(401);
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
                    .delete(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${adminToken}`);
                res.should.have.status(204);
                res.body.should.be.a("object");
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .delete(`/api/v1/users/${adminId}`)
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(202);
                res.body.should.be.a("object");
                res.body.should.have.keys(userKeys);
            } catch (err) {
                throw err;
            }
        });
        it("USER should fail", async () => {
            try {
                const res = await chai
                    .request(server)
                    .delete(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${userToken}`)
                    .send({ lastName: "georges" });
                res.should.have.status(401);
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
                    .delete(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${adminToken}`);
                res.should.have.status(204);
                res.body.should.be.a("object");
            } catch (err) {
                throw err;
            }
        });
        it("ADMIN should success", async () => {
            try {
                const res = await chai
                    .request(server)
                    .delete(`/api/v1/users/${adminId}`)
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
                    .delete(`/api/v1/users/${userId}`)
                    .set("Authorization", `Bearer ${userToken}`);
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
                    .delete(`/api/v1/users/refzmldfsmqkdmlqskdqmslkqsdjqslkdj`)
                    .set("Authorization", `Bearer ${userToken}`);
                res.should.have.status(401);
                res.body.should.be.a("object");
            } catch (err) {
                throw err;
            }
        });
    });
});
