const express = require("express");
const userTypes = express.Router();
const UserType = require("../../../models/UserType");
const { Connection } = require("pg");

userTypes.get("/", async (req, res) => {
    try {
        const userType = await UserType.findAll();
        res.status(200).json(userType);
    } catch (err) {
        res.status(400).json(err);
    }
});

userTypes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userType = await UserType.findByPk(id);
        res.status(200).json(userType);
    } catch (err) {
        res.status(400).json(err);
    }
});

userTypes.post("/", async (req, res) => {
    const { label } = req.body;
    try {
        const userType = await UserType.create({
            label,
        });
        res.status(201).json(userType)
                    ;
                    
    } catch (err) {
        res.status(422).json(err);
    }
});

userTypes.put("/:id", async (req, res) => {
    const { label } = req.body;
    const { id } = req.params;
    try {
        await UserType.update(
            {
                label,
            },
            { where: { id } }
        );
        const userType = await UserType.findByPk(id)
        res.status(202).json(userType);
    } catch (err) {
        res.status(422).json(err);
    }
});

userTypes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const userType = await UserType.destroy({ where: { id } });
        res.status(204).send("Le type d'utilisateur a bien été effacé");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = userTypes;
