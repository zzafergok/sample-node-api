const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 255 },
  email: {
    type: String,
    required: true,
    min: 9,
    max: 255,
    unique: true,
  },
  password: { type: String, required: true, min: 6, max: 1024 },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
