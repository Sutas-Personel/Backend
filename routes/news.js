const express = require("express");
const News = require("../models/News");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.get("/getAll", async function (req, res) {
  News.find({}).then(function (news) { //find arama yapacağı alan {} hepsini
    res.send(news);
  });
});

router.get("/search/:newsId", async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);
    res.json(news);
  } catch (err) {
    res.json({ mesaage: err });
  }
  
});

router.post("/add", (req, res) => {
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
      res.json({ mesaage: err });
    });
});



router.delete("/delete/:newsId", async (req, res) => {
  try {
    const removedNews = await News.remove({ _id: req.params.newsId });
    res.json(removedNews);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.patch("/update/:newsId", async (req, res) => {
  try {
    const updateNews = await News.updateOne(
      { _id: req.params.newsId },
      { $set: { title: req.body.title } },
      { $set: { image: req.body.image } },
      { $set: { content: req.body.content } }
    );
    res.json(updateNews);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

module.exports = router;
