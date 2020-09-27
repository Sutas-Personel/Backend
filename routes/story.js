const express = require("express");
const Story = require("../models/Story");


const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);
});

router.post("/", (req, res) => {
  const story = new Story({
    url: req.body.url,
    media: req.body.media,
    duration: req.body.duration,
    user: req.body.user,
  });

  story
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ mesaage: err });
    });
});

router.get("/:storyId", async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    res.json(story);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.delete("/:storyId", async (req, res) => {
  try {
    const removedStory = await Story.remove({ _id: req.params.newsId });
    res.json(removedStory);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.patch("/:storyId", async (req, res) => {
  try {
    const updateStory = await Story.updateOne(
      { _id: req.params.newsId },
      { $set: { url: req.body.url } },
      { $set: {  media: req.body.media } },
      { $set: { duration: req.body.duration } },
      { $set: {  user: req.body.user } }
    );
    res.json(updateStory);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

router.get("/getAll", async function (req, res) {
    Story.find({}).then(function (story) { //find arama yapacağı alan {} hepsini
      res.send(story);
    });
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