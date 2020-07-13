const express = require("express");
const UserType = require("../../../models/UserType");
const User = require("../../../models/User");
const authRole = require("../../../middleware/authRole");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userType = await UserType.findAll();
    res.status(200).json(userType);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const userType = await UserType.findByPk(id);
    res.status(200).json(userType);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id/users", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const typesWithUsers = await UserType.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(200).json(typesWithUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", authRole("ADMIN"), async (req, res) => {
  const { label } = req.body;
  try {
    const userType = await UserType.create({
      label,
    });
    res.status(201).json(userType);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put("/:id", authRole("ADMIN"), async (req, res) => {
  const { label } = req.body;
  const { id } = req.params;
  try {
    await UserType.update(
      {
        label,
      },
      { where: { id } }
    );
    const userType = await UserType.findByPk(id);
    res.status(202).json(userType);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete("/:id", authRole("ADMIN"), async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.destroy({ where: { id } });
    res.status(204).send("Le type d'utilisateur a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
