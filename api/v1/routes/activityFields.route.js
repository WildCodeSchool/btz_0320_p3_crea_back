const express = require("express");
const activitiesFields = express.Router();
const ActivityField = require("../../../models/ActivityField");

activitiesFields.get("/", async (req, res) => {
  try {
    const activitiesFields = await ActivityField.findAll();
    res.status(200).json(activitiesFields);
  } catch (err) {
    res.status(400).json(err);
  }
});

activitiesFields.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activityField = await ActivityField.findByPk(id);
    res.status(200).json(activityField);
  } catch (err) {
    res.status(400).json(err);
  }
});

activitiesFields.post("/", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  try {
    const activityField = await ActivityField.create({
      labelFr,
      labelEs,
      labelEus,
    });
    res.status(201).json(activityField);
  } catch (err) {
    res.status(422).json(err);
  }
});

activitiesFields.put("/:id", async (req, res) => {
  const { labelFr, labelEs, labelEus } = req.body;
  const { id } = req.params;
  try {
    await ActivityField.update(
      {
        labelFr,
        labelEs,
        labelEus,
      },
      { where: { id } }
    );
    const activityField = await ActivityField.findByPk(id);
    res.status(202).json(activityField);
  } catch (err) {
    res.status(422).json(err);
  }
});

activitiesFields.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activityField = await ActivityField.destroy({
      where: { id },
    });
    res.status(204).send("La catégorie a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = activitiesFields;
