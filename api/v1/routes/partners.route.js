const express = require("express");
const partners = express.Router();
const Partner = require("../../../models/Partner");

partners.get("/", async (req, res) => {
  try {
    const partner = await Partner.findAll();
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json(err);
  }
});

partners.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ where: { id } });
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json(err);
  }
});

partners.post("/", async (req, res) => {
  const { label, url, logo } = req.body;
  try {
    const partner = await Partner.create({
      label,
      url,
      logo,
    });
    res.status(201).json(partner);
  } catch (err) {
    res.status(422).json(err);
  }
});

partners.put("/:id", async (req, res) => {
  const { label, url, logo } = req.body;
  const { id } = req.params;
  try {
    await Partner.update(
      {
        label,
        url,
        logo,
      },
      { where: { id } }
    );
    const partner = await Partner.findByPk(id)
    res.status(202).json(partner);
  } catch (err) {
    res.status(422).json(err);
  }
});

partners.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const partner = await Partner.destroy({ where: { id } });
    res.status(204).send("Le partenaire d'utilisateur a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = partners;
