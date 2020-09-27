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
const notificationRoute = require("./routes/notifications");

app.use("/posts", postRoute);
app.use("/news", newsRoute);
app.use("/story", storyRoute);
app.use("/notifications", notificationRoute);

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
};

// mongoose.connect(
// process.env.MONGODB_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => console.log("connect to db")
// );

mongoose.connect(uri, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Routes

app.get("/", (req, res) => {
  res.send(200, "Merhaba dünya");
});

// Listening

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log("Example app listening on port 8080!"));
