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
        allowNull: false,
    },
    schoolName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    companyName: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    siret: {
        type: Sequelize.STRING(14),
        allowNull: false,
    },
    qualification: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    mobility: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    name_organisation: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
});

module.exports = User;
