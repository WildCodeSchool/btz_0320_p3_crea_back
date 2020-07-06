const express = require("express");
const jobCategory = express.Router();
const JobCategory = require("../../../models/JobCategory");
const authRole = require("../../../middleware/authRole");

jobCategory.get("/",authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const category = await JobCategory.findAll();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

jobCategory.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const category = await JobCategory.findByPk(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

jobCategory.post("/", authRole("ADMIN"), async (req, res) => {
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

jobCategory.put("/:id", authRole("ADMIN"), async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  const { id } = req.params;
  try {
    await JobCategory.update(
      {
        labelFr,
        labelEs,
        labelEus,
      },
      { where: { id } }
    );
    const category = await JobCategory.findByPk(id);
    res.status(202).json(category);
  } catch (err) {
    res.status(422).json(err);
  }
});

jobCategory.delete("/:id", authRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;
    const category = await JobCategory.destroy({
      where: { id },
    });
    res.status(204).send("La catégorie de job a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = jobCategory;
