const express = require("express");
const Notifications = require("../models/Notification");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.get("/getAll", async function (req, res) {
  Notifications.find({}).then(function (notifications) {
    //find arama yapacağı alan {} hepsini
    res.send(200, notifications);
  });
});

router.get("/search/:notificationId", async (req, res) => {
  try {
    const notification = await Notifications.findById(req.params.notificationId);
    res.json(notification);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.post("/add", (req, res) => {
  const post = new Notifications({
    title: req.body.title,
    subtitle: req.body.subtitle,
    important: req.body.important,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ mesaage: err });
    });
 });

  router.delete("/delete/:notificationsId", async (req, res) => {
    try {
      const removedPost = await Notifications.remove({
        _id: req.params.notificationsId,
      });
      res.json(removedPost);
    } catch (err) {
      res.json({ mesaage: err });
    }
 
});

router.patch("/update/:notificationsId", async (req, res) => {
  try {
    const updateNews = await Notifications.updateOne(
      { _id: req.params.newsId },
      { $set: { url: req.body.url } },
      { $set: { duration: req.body.duration } },
      { $set: { user: req.body.user } },
      { $set: { media: req.body.media } }
    );
    res.json(updateNews);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

module.exports = router;
