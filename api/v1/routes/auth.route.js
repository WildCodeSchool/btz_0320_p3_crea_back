require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const UserType = require("../../../models/UserType");
const Role = require("../../../models/Role");
const { SECRET } = process.env;
const generator = require('generate-password');

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
      delete user.dataValues.password;
      res.status(200).json({ token, user });
    } else {
      res.status(422).json({ message: "Wrong credentials", error: err.errors });
    }
  } catch (err) {
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
    country,
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
      country,
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
    res.status(201).json(register);
  } catch (err) {
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
});

router.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ where: { email } });
    const password = generator.generate({
      length: 10,
      numbers: true
  });

    User.update({ password }, { where: { email }, individualHooks: true  });

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "eldora.block86@ethereal.email",
        pass: "KdKN8MmH1sD7mrQRYQ",
      },
    });

    const success = await transporter.verify();

    let info = await transporter.sendMail({
      from: '"Crea" <contact@crea-aquitaine.org>',
      to: email,
      subject: "Nouveau mot de passe",
      text: "Hello world",
      html:`<h4>Bonjour ${findUser.firstName} ${findUser.lastName},</h4>

     <p> Voici votre mot de passe pour la plateforme NetWorking CREA : ${password} </p>

     <em><b> À ne pas communiquer. </b></em>`,
    });

    res.status(200).json({ success, info });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
