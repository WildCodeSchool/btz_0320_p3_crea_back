const express = require("express");
const users = express.Router();
const User = require("../models/User");

users.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
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
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});
module.exports = users;
