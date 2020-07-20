require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const sequelize = require("./sequelize");
require("./association");
const Role = require("./models/Role");
const User = require("./models/User");
const UserType = require("./models/UserType");

const api = require("./api/v1");
const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use("/api/v1", api);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur CREA_PROJECT");
});

if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync({ alter: true })
    .then(() => {
      return sequelize.authenticate();
    })
    .then(() => {
      // we create two roles only if they don't exists
      return Promise.all([
        Role.findCreateFind({ where: { label: "ADMIN" } }),
        Role.findCreateFind({ where: { label: "USER" } }),
      ]);
    })
    .then(() => {
      return Promise.all([
        UserType.findCreateFind({ where: { label: "Entreprise" } }),
        UserType.findCreateFind({ where: { label: "Demandeur emploi" } }),
        UserType.findCreateFind({ where: { label: "Ecole" } }),
      ]);
    })
    .then(([admin, user]) => {
      // then we create two users for testing
      return Promise.all([
        User.findCreateFind({
          where: { email: "admin@dev.com" },
          defaults: {
            password: "admin",
            firstName: "admin",
            lastName: "admin",
            localisation: "admin",
            country: "France",
            phone_number: 0656565656,
            RoleId: admin[0].id,
          },
        }),
        User.findCreateFind({
          where: { email: "user@dev.com" },
          defaults: {
            password: "user",
            firstName: "user",
            lastName: "user",
            localisation: "user",
            country: "France",
            phone_number: 0656565656,
            RoleId: user[0].id,
          },
        }),
      ]);
    })
    .then(() => {
      app.listen(port, (err) => {
        if (err) {
          throw new Error("Something really bad happened ...");
        }
        console.log(`Server is listening on ${port}`);
      });
    })
    .catch((err) => {
      console.log("unable to join database", err.message);
    });
}

module.exports = app;
