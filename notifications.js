const express = require("express");
const Notifications = require("./models/Notification");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.get("/getAll", async function (req, res) {
  Notifications.find({}).then(function (notifications) {
    //find arama yapacağı alan {} hepsini
    res.send(notifications);
  });
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

  router.delete("/:notificationsId", async (req, res) => {
    try {
      const removedPost = await Notifications.remove({
        _id: req.params.notificationsId,
      });
      res.json(removedPost);
    } catch (err) {
      res.json({ mesaage: err });
    }
  });
});

module.exports = router;
