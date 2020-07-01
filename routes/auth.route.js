require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = process.env;

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email,
            },
            // include : [
            //     {
            //         model: Role,
            //         attributes: ["label"]
            //     }
            // ]
        });
        const isPasswordValid = user.validPassword(password);
        if (user && isPasswordValid) {
            const token = jwt.sign(
                {
                    email: user.dataValues.email,
                    isAdmin: user.dataValues.isAdmin,
                    role: user.dataValues.Role.label,
                    // UserType: user.dataValues.UserTypeLabel,
                },
                SECRET,
                {
                    expiresIn: "24h",
                }
            );
            delete user.dataValues.password;
            res.status(200).json({ token, user });
        } else {
            res.status(422).json({ message: "Wrong credentials" });
        }
    } catch (err) {
        res.status(422).json({ message: "Wrong credentials" });
    }
});

router.post("/register", async (req, res) => {});

module.exports = router;