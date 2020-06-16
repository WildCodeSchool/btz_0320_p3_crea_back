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
module.exports = users;
