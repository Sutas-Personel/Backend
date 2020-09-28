const express = require("express");
const mongoose = require("mongoose");
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
//require("dotenv/config");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());


// Import routes

const postRoute = require("./functions/routes/posts");
const newsRoute = require("./functions/routes/news");
const storyRoute = require("./functions/routes/story");

app.use("/posts", postRoute);
app.use("/news", newsRoute);
app.use("/story", storyRoute);

// Connect to DB


var uri =
  "mongodb+srv://sutas:sutas1975@cluster0.hbxv1.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Routes

app.get("/", (req, res) => {
  res.send(200,"Merhaba dünya");
});

// Listening
var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log("Example app listening on port 8080!"));
