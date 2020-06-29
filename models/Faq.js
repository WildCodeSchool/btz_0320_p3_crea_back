const Sequelize = require("sequelize");

const sequlizeInstance = require("../sequelize");

const Faq = sequlizeInstance.define("Faq", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    question: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    answer: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    language: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
});

module.exports = Faq;
