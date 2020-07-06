const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const ActivityField = sequelizeInstance.define("ActivityField", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  labelFr: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  labelEs: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  labelEus: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = ActivityField;
