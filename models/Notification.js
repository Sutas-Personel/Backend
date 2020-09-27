const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("News", notificationsSchema);
