const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Purchase = new Schema({
  email: {
    type: String,
    requires: true,
    unique: true
  },
  id: {
    type: String,
    requires: true
  }
});

module.exports = Purchase = mongoose.model("user", Purchase);
