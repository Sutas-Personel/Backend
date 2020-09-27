const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());

// Import routes

const postRoute = require("./routes/posts");
const newsRoute = require("./routes/news");
const notifications = require("./routes/notifications");
const News = require("./models/News");

app.use("/posts", postRoute);
app.use("/notifications", notifications);
app.use("/news", newsRoute);

// Connect to DB

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connect to db")
);

// Routes

app.get("/", (req, res) => {
  res.send(200,"Merhaba dünya");
});

// Listening

app.listen(process.env.PORT || 3000, () => {
  console.log("sunucu ayakta bekliyor");
});
