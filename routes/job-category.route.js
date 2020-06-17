const express = require("express");
const jobCategory = express.Router();
const JobCategory = require("../models/JobCategory");

jobCategory.get("/", async (req, res) => {
  try {
    const category = await JobCategory.findAll();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

jobCategory.post("/", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  try {
    const category = await JobCategory.create({
      labelFr,
      labelEs,
      labelEus,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(422).json(err);
  }
});

jobCategory.put("/:id", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  const { id } = req.params;
  try {
    const category = await JobCategory.update(
      {
        labelFr,
        labelEs,
        labelEus,
      },
      { where: { id } }
    );
    res.status(202).json(category);
  } catch (err) {
    res.status(422).json(err);
  }
});

jobCategory.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await JobCategory.destroy({
      where: { id },
    });
    res.status(205).send("La catégorie de job a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = jobCategory;
