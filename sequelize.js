require("dotenv").config();
const Sequelize = require("sequelize");
const { DBNAME, DBPASS, DBUSER, NODE_ENV } = process.env;

module.exports = new Sequelize({
    host: "localhost",
    username: DBUSER,
    password: DBPASS,
    database: NODE_ENV !== "test" ? DBNAME : "crea_project",
    dialect: "mysql",
});