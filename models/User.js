const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const User = sequelizeInstance.define("User", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(14),
        allowNull: false,
        validate : {
            max : 14,
            min : 8,
        }
    },
    localisation: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
    },
    phone_number2: {
        type: Sequelize.INTEGER(15),
        allowNull: true,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    schoolName: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    companyName: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    siret: {
        type: Sequelize.STRING(14),
        allowNull: true,
    },
    qualification: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    mobility: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    name_organisation: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    logo: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
});

module.exports = User;
