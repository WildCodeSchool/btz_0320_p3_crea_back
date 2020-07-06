const Sequelize = require("sequelize");

const bcrypt = require("bcrypt");

const sequelizeInstance = require("../sequelize");

const User = sequelizeInstance.define(
  "User",
  {
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
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 14,
        min: 8,
      },
    },
    localisation: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    country: {
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
    // isAdmin: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false,
    // },
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
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
//   if (password === this.password) {
//     return true;
//   } else {
//     return false;
//   }
};

module.exports = User;
