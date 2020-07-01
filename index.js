require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 8080;

const sequelize = require("./sequelize");
require("./association");
const api = require("./api/v1") 
const auth = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
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
            app.listen(port, (err) => {
                if (err) {
                    throw new Error("Something really bad happened ...");
                }
                console.log(`Server is listening on ${port}`);
            });
        })
        .catch((err) => {
            console.log("enable to join database", err.message);
        });
}

module.exports = app;
