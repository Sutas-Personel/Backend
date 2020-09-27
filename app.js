const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("dotenv/config");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());

// Import routes

const postRoute = require("./routes/posts");
const newsRoute = require("./routes/news");
const storyRoute = require("./routes/story");
const notificationRoute = require("./routes/notification");

app.use("/posts", postRoute);
app.use("/news", newsRoute);
app.use("/story", storyRoute);
app.use("/notification", notificationRoute);

// Connect to DB

mongoose.connect(
  "mongodb+srv://sutas:sutas1975@cluster0.hbxv1.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connect to db")
);

// Routes

app.get("/", (req, res) => {
  res.send(200, "Merhaba dünya");
});

// Listening

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log("Example app listening on port 8080!"));
