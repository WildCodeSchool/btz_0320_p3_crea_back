const Sequelize = require("sequelize");

const sequlizeInstance = require("../sequelize");

const ActivityField = sequlizeInstance.define("Faq", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  labelFr: {
    type: Sequelize.STRING(100),
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
