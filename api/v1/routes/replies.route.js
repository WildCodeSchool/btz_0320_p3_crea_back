const express = require("express");
const router = express.Router();
const Reply = require("../../../model/Reply");

router.get("/", async (req, res) => {
  try {
    const replies = await Reply.findAll();
    res.status(200).json(replies);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reply = await Reply.findAll({ where: { id } });
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  const { comment, title, resume, UserId, PostId } = req.body;
  try {
    const user = await User.create({
      comment,
      title,
      resume,
      UserId,
      PostId,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { title, resume, comment, UserId, PostId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.update(
      {
        title,
        resume,
        comment,
        UserId,
        PostId,
      },
      { where: { id } }
    );
    res.status(202).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reply = await Reply.destroy({
        where: { id },
      });
      res.status(205).send("La réponse a bien été effacé");
    } catch (err) {
      res.status(422).json(err);
    }
  });

module.exports = router;
