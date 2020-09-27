const express = require("express");
const mongoose = require("mongoose");
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());
const PORT = 3000;

// Import routes

const postRoute = require("./functions/routes/posts");
const newsRoute = require("./functions/routes/news");
const storyRoute = require("./functions/routes/story");

app.use("/posts", postRoute);
app.use("/news", newsRoute);
app.use("/story", storyRoute);

// Connect to DB

mongoose.connect(
  "mongodb+srv://sutas:sutas1975@cluster0.hbxv1.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connect to db")
);

// Routes

app.get("/", (req, res) => {
  res.send("Merhaba dünya");
});

// Listening
var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log("Example app listening on port 8080!"));
