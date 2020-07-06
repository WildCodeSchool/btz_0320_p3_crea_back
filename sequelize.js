require("dotenv").config();
const Sequelize = require("sequelize");
const { DBNAME, DBPASS, DBUSER, DBDIALECT, DBHOST } = process.env;

module.exports = new Sequelize({
    host: DBHOST || "localhost",
    username: DBUSER,
    password: DBPASS,
    database: DBNAME,
    dialect:  DBDIALECT,
    logging: false,
});
