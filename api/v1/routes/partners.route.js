const express = require("express");
const router = express.Router();
const Partner = require("../../../models/Partner");
const authRole = require("../../../middleware/authRole");
const { validator, partnersForPut } = require("../../../middleware/validator");

router.get("/", async (req, res) => {
  try {
    const partner = await Partner.findAll();
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ where: { id } });
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", authRole("ADMIN"), async (req, res) => {
  const { label, url, logo, favorite, description } = req.body;
  try {
    const partner = await Partner.create({
      label,
      description,
      url,
      logo,
      favorite,
    });
    res.status(201).json(partner);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put(
  "/:id",
  authRole("ADMIN"),
  validator(partnersForPut, "body"),
  async (req, res) => {
    const { label, url, logo, favorite, description } = req.body;
    const { id } = req.params;
    try {
      await Partner.update(
        {
          label,
          description,
          url,
          logo,
          favorite,
        },
        { where: { id } }
      );
      const partner = await Partner.findByPk(id);
      res.status(202).json(partner);
    } catch (err) {
      res.status(422).json(err);
    }
  }
);

router.delete("/:id", authRole("ADMIN"), async (req, res) => {
  const { id } = req.params;
  try {
    const partner = await Partner.destroy({ where: { id } });
    res.status(204).json({ message: "partner is delete." });
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
