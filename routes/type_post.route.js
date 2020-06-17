const express = require("express");
const types_post = express.Router();
const Type_post = require("../models/TypePost");

types_post.get("/", async (req, res) => {
  try {
    const types_post = await Type_post.findAll();
    res.status(200).json(types_post);
  } catch (err) {
    res.status(400).json(err);
  }
});

types_post.post("/", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  try {
    const type_post = await Type_post.create({
      labelFr, //label renvoit à une liste de type d'annonce comme partenariat, R&D, rech emploi...
      labelEs,
      labelEus,
    });
    res.status(201).json(type_post);
  } catch (err) {
    res.status(422).json(err);
  }
});

types_post.put("/:id", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  const { id } = req.params;
  try {
    const type_post = await Type_post.update(
      {
        labelFr,
        labelEs,
        labelEus,
      },
      { where: { id } }
    );
    res.status(202).json(type_post);
  } catch (err) {
    res.status(422).json(err);
  }
});

types_post.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const type_post = await Type_post.destroy({
      where: { id },
    });
    res.status(205).send("L'utilisateur a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = types_post;
