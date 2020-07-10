const express = require("express");
const router = express.Router();
const ActivityField = require("../../../models/ActivityField");
const authRole = require("../../../middleware/authRole");

router.get("/", async (req, res) => {
  try {
    const router = await ActivityField.findAll();
    res.status(200).json(router);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id",authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const activityField = await ActivityField.findByPk(id);
    res.status(200).json(activityField);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", authRole("ADMIN"), async (req, res) => {
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

router.put("/:id", authRole("ADMIN"), async (req, res) => {
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

router.delete("/:id", authRole("ADMIN"), async (req, res) => {
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

module.exports = router;
