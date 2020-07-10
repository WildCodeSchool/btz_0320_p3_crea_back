const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();
const authRole = require("../../../middleware/authRole");
const { validator, postForPut } = require("../../../middleware/validator");
const JobCategory = require("../../../models/JobCategory");
const TypePost = require("../../../models/TypePost");
const Reply = require("../../../models/Reply");
const User = require("../../../models/User");

router.get("/", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const post = await Post.findAll({
      include: [
        {
          model: TypePost,
        },
        {
          model: JobCategory,
        },
      ],
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findAll({
      where: { id },
      include: [
        {
          model: JobCategory,
        },
        {
          model: TypePost,
        },
      ],
    });
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
    // if (req.user.role === "USER") {
    //   await Post.destroy({
    //     where: { id, UserId: req.user.id },
    //   });
    //   res.status(204).end();
    // } else if (req.user.role === "ADMIN") {
    //   await Post.destroy({
    //     where: { id },
    //   });
    //   res.status(204).end();
    // } else {
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
