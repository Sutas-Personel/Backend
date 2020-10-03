const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("dotenv/config");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());

//swagger
var swaggerUi = require("swagger-ui-express");

swaggerDocument = require("./swagger.json");

app.use("/api-docs" ,swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
  res.send('Swagger doc /api-docs');
});



//
//swagger statik olarak anasayfaya taşıyor

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
  useNewUrlParser: true,
  useUnifiedTopology: true,
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



// Listening

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log("Example app listening on port 8080!"));
