const express = require("express");
const users = express.Router();
const User = require("../models/User");
const authRole = require("./middleware/authRole");
const authAdmin = require("./middleware/authAdmin");
const user = require("../routes/auth.route");
const User = require("../../../models/User");
const Post = require("../../../models/Post");

users.get("/", authRole("true"), async (req, res) => {
    try {
        console.log(req.user);
        if (req.user && req.user.isAdmin) {
            const users = await User.findAll();
            res.status(200).json(users);
        } else {
            console.log("error");
            throw new Error("You are not admin ! GET THE FUCK OUT !");
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

users.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.post("/", async (req, res) => {
  const {
    lastName,
    firstName,
    email,
    password,
    localisation,
    phone_number,
    phone_number2,
    isAdmin,
    schoolName,
    companyName,
    siret,
    qualification,
    mobility,
    name_organisation,
    isActive,
    logo,
    UserTypeId,
    ActivityFieldId,
  } = req.body;
  try {
    const user = await User.create({
      lastName,
      firstName,
      email,
      password,
      localisation,
      phone_number,
      phone_number2,
      isAdmin,
      schoolName,
      companyName,
      siret,
      qualification,
      mobility,
      name_organisation,
      isActive,
      logo,
      UserTypeId,
      ActivityFieldId,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

users.put("/:id", async (req, res) => {
  const {
    lastName,
    firstName,
    email,
    password,
    localisation,
    phone_number,
    phone_number2,
    isAdmin,
    schoolName,
    companyName,
    siret,
    qualification,
    mobility,
    name_organisation,
    isActive,
    logo,
    UserTypeId,
    ActivityFieldId,
  } = req.body;
  const { id } = req.params;
  try {
    await User.update(
      {
        lastName,
        firstName,
        email,
        password,
        localisation,
        phone_number,
        phone_number2,
        isAdmin,
        schoolName,
        companyName,
        siret,
        qualification,
        mobility,
        name_organisation,
        isActive,
        logo,
        UserTypeId,
        ActivityFieldId,
      },
      { where: { id } }
    );
    const user = await User.findByPk(id)
    res.status(202).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

users.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });
    res.status(204).send("L'utilisateur a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

// récupérer les posts d'un utilisateur
users.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findAll({ where: { UserId: id } });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = users;
