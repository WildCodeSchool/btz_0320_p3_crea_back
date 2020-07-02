const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Role = sequelizeInstance.define("Role", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    label: {
        type: Sequelize.STRING, 
        allowNull: false,
    },
});

module.exports = Role;