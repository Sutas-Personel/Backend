const express = require("express");
const Notifications = require("../models/Notification");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});
module.exports = router;
