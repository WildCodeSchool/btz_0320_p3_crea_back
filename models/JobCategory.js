const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const JobCategory = sequelizeInstance.define("JobCategory", {
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
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  labelEus: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = JobCategory;
