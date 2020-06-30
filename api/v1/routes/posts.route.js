const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const {
    title,
    content,
    localisation,
    language,
    UserId,
    TypePostId,
    JobCategoryId,
  } = req.body;
  const { id } = req.params;
  try {
    await Post.update(
      {
        title,
        content,
        localisation,
        language,
        UserId,
        TypePostId,
        JobCategoryId,
      },
      { where: { id } }
    );
    const post = await Post.findByPk(id)
    res.status(202).json(post);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.destroy({
      where: { id },
    });
    res.status(204).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
