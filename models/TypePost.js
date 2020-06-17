const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const TypePost = sequelizeInstance.define("TypePost", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  labelFr: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  labelEs: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  labelEus: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
});

module.exports = TypePost;
