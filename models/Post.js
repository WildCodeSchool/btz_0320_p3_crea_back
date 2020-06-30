const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Post = sequelizeInstance.define(
  "Post",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    localisation: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  }
);

module.exports = Post;
