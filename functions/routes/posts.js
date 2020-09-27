const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", (req, res) => {
  const post = req.body;
  res.json(post);
  console.log(req.body);

  // res.send('burası posts mekanı')
});

router.get("/getAll", async function (req, res) {
  Post.find({}).then(function (posts) { //find arama yapacağı alan {} hepsini
    res.send(posts);
  });
});

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
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

// Id göre arama

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

// delete post

router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

// update post

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

module.exports = router;


//asenkron işlem yapmak için

/* router.get("/getAll", async function (req, res) {

try {
  const posts = await Post.find({});
const postMap = {};
posts.forEach((post) => {
    postMap[post._id] = post;
});

res.send(postMap);

  } catch (err) {
    res.json({ mesaage: err });
  }

});
//output
/* {
    "5f6fd10419166215881a50a2": {
        "_id": "5f6fd10419166215881a50a2",
        "title": "ilkData",
        "description": "ilk deneme",
        "date": "2020-09-26T23:38:44.130Z",
        "__v": 0
    } */
 