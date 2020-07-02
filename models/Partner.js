const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Partner = sequelizeInstance.define("Partner", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  label: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  logo: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  favorite: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Partner;
