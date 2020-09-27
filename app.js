const express = require("express");
const mongoose = require("mongoose");
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
require("dotenv/config");


const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());

// Import routes

const postRoute = require("./functions/routes/posts");
const newsRoute = require("./functions/routes/news");
const storyRoute = require('./functions/routes/story');


app.use("/posts", postRoute);
app.use("/news",newsRoute);
app.use("/story",storyRoute);


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
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

