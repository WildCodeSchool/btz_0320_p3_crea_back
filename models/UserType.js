const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const UserType = sequelizeInstance.define("UserType", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    label: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
});

module.exports = UserType;
