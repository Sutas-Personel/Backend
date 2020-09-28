const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    enum: ["VIDEO", "IMAGE"],
    default: "IMAGE",
  },
  duration: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },s
});

module.exports = mongoose.model("Story", storySchema);
