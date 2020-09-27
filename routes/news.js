const express = require("express");
const News = require("../models/News");

const router = express.Router();

router.get("/", (req, res) => {
   const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.post("/", (req, res) => {
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    content: req.body.content,
  });

  news
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.delete("/:contentId", async (req, res) => {
  try {
    const removedContent = await Content.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

module.exports = router;
