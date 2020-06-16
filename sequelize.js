require("dotenv").config();
const Sequelize = require("sequelize");
const { DBNAME, DBPASS, DBUSER } = process.env;

module.exports = new Sequelize({
    host: "localhost",
    username: DBUSER,
    password: DBPASS,
    database: DBNAME,
    dialect: "mysql",
});
