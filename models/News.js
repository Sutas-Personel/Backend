const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  });



  module.exports = mongoose.model("News", newsSchema);