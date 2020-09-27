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
      res.json({ mesaage: err });
    });
});

router.get("/:newsId", async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);
    res.json(news);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.delete("/:newsId", async (req, res) => {
  try {
    const removedNews = await News.remove({ _id: req.params.newsId });
    res.json(removedNews);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.patch("/:newsId", async (req, res) => {
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

function getById(_id) {
    var deferred = Q.defer();
    var dashboard = db.collection("dashboard");
  
    db.collection("dashboard")
      .find({ user_id: ObjectId(_id) })
      // *****
      .toArray(function (err, user) {
        console.log(user);
        console.log(_id);
  
        if (err) deferred.reject(err);
  
        if (user) {
          // return user (without hashed password)
          deferred.resolve(_.omit(user, "hash"));
        } else {
          // user not found
          deferred.resolve();
        }
      });
  
    return deferred.promise;
  }


module.exports = router;
