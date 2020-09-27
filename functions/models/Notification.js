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

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  important: {
    type: String,
    required: true,
    enum:["1","2"],
    default: "1"
  },
});

module.exports = mongoose.model("Notifications", notificationsSchema);
