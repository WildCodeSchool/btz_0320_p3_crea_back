const express = require("express");
const users = express.Router();
const User = require("../models/User");
const authRole = require("./middleware/authRole");

users.get("/", authRole(true), async (req, res) => {
    try {
        if (req.user && req.user.isAdmin) {
            const users = await User.findAll();
            res.status(200).json(users);
        } else {
            throw new Error("You are not admin ! GET THE FUCK OUT !");
        }
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
    } = req.body;
    const { id } = req.params;
    try {
        const user = await User.update(
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
            },
            { where: { id } }
        );
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
        res.status(205).send("L'utilisateur a bien été effacé");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = users;
