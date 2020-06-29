const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Reply = sequelizeInstance.define("Reply", {
  comment: {
    type: Sequelize.TEXT, // .TEXT for no character limit
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  resume: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
});

module.exports = Reply;
