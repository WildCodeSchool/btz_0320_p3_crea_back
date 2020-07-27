const express = require("express");
const router = express.Router();

const JobCategory = require("../../../models/JobCategory");
const authRole = require("../../../middleware/authRole");

router.get("/",authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const category = await JobCategory.findAll();
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const category = await JobCategory.findByPk(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", authRole("ADMIN"), async (req, res) => {
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

router.put("/:id", authRole("ADMIN"), async (req, res) => {
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

router.delete("/:id", authRole("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params;
    const category = await JobCategory.destroy({
      where: { id },
    });
    res.status(204).json({message : "Job category is deleted."});
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
