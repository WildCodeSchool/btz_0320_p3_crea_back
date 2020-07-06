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
},{
  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
});

module.exports = ActivityField;
