const express = require("express");
const Notifications = require("../models/Notification");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.get("/getAll", async function (req, res) {
  Notifications.find({}).then(function (notifications) { //find arama yapacağı alan {} hepsini
    res.send(notifications);
  });
});

module.exports = router;
