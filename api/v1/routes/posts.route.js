const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const authRole = require("../../../middleware/authRole");
const { validator, postForPut } = require("../../../middleware/validator");

router.get("/", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", authRole(["ADMIN", "USER"]), async (req, res) => {
  const {
    title,
    content,
    localisation,
    language,
    UserId,
    TypePostId,
    JobCategoryId,
  } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      localisation,
      language,
      UserId,
      TypePostId,
      JobCategoryId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put(
  "/:id",
  authRole(["ADMIN", "USER"]),
  validator(postForPut, "body"),
  async (req, res) => {
    const {
      title,
      content,
      localisation,
      language,
      TypePostId,
      JobCategoryId,
    } = req.body;
    const { id } = req.params;
    try {
      const { UserId } = await Post.findByPk(id);

      if (req.user.role === "USER" && req.user.id !== UserId) {
        res.status(401).json({
          message: "You are not allowed to modify this",
        });
      }
      await Post.update(
        {
          title,
          content,
          localisation,
          language,
          TypePostId,
          JobCategoryId,
        },
        { where: { id } }
      );
      const post = await Post.findByPk(id);
      res.status(202).json(post);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  const { id } = req.params;
  try {
    // if (req.user.role === "USER" && req.user.id == UserId) {
    //   res.status(401).json({ message: "You are not allowed to delete this" });
    // }
    await Post.destroy({
      where: { id, UserId: req.user.id },
    });
    res.status(204).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
