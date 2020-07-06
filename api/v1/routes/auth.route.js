require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const UserType = require("../../../models/UserType");
const Role = require("../../../models/Role");
const { SECRET } = process.env;

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          attributes: ["label"],
        },
        {
          model: UserType,
          attributes: ["label"],
        },
      ],
    });
    const isPasswordValid = user.validPassword(password);

    if (user && isPasswordValid) {
      const payload = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.Role.label,
        type: null,
      };

      if (user.dataValues.UserTypeId !== null) {
        payload.type = user.dataValues.UserType.label;
      }

      const token = jwt.sign(payload, SECRET, {
        expiresIn: "24h",
      });
      // delete user.dataValues.password;
      res.status(200).json({ token, user });
    } else {
      res.status(422).json({ message: "Wrong credentials", error: err.errors });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
});

router.post("/register", async (req, res) => {
  const {
    lastName,
    firstName,
    email,
    password,
    localisation,
    phone_number,
    phone_number2,
    schoolName,
    companyName,
    siret,
    qualification,
    mobility,
    name_organisation,
    isActive,
    logo,
    ActivityFieldId,
    UserTypeId,
    RoleId,
  } = req.body;
  try {
    const register = await User.create({
      lastName,
      firstName,
      email,
      password,
      localisation,
      phone_number,
      phone_number2,
      schoolName,
      companyName,
      siret,
      qualification,
      mobility,
      name_organisation,
      isActive,
      logo,
      ActivityFieldId,
      UserTypeId,
      RoleId,
    });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          attributes: ["label"],
        },
        {
          model: UserType,
          attributes: ["label"],
        },
      ],
    });
    const isPasswordValid = user.validPassword(password);

    if (user && isPasswordValid) {
      const payload = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.Role.label,
        type: null,
      };

      if (user.dataValues.UserTypeId !== null) {
        payload.type = user.dataValues.UserType.label;
      }
      const token = jwt.sign(payload, SECRET, {
        expiresIn: "24h",
      });
      delete user.dataValues.password;
      res.status(200).json({ token, user });
    } else {
      res.status(422).json({ message: "Wrong credentials", error: err.errors });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
});

module.exports = router;
