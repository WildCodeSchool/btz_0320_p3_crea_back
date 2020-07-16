const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Reply = sequelizeInstance.define("Reply", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  comment: {
    type: Sequelize.TEXT, // .TEXT for no character limit
    allowNull: false,
  },
  resume: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  userPostId: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  titlePost: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
});

module.exports = Reply;
