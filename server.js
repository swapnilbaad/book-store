const express = require("express");
const mongoose = require("mongoose");
const books = require("./routes/api/books");
const config = require("config");
const app = express();

app.use(express.json());

// DB Config

const db = config.get("mongoURI");

// Connect to Mongo

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));

app.use("/api/books", books);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port ${port}"));
