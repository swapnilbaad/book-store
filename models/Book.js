const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    requires: true
  },
  price: {
    type: Number,
    requires: true
  },
  units: {
    type: Number,
    requires: true
  },
  description: {
    type: String,
    requires: true
  }
});

module.exports = Book = mongoose.model("book", BookSchema);
