const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
//Book Model

const Book = require("../../models/Book");

const objectId = require("mongodb").ObjectID;

// @route GET api/items
// @desc Get All Books
// @access Public

router.get("/", (req, res) => {
  Book.find().then(books => res.json(books));
});

// @route POST api/items
// @desc Create A  Book
// @access Private

router.post("/", auth, (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    units: req.body.units
  });

  newBook.save().then(book => res.json(book));
});

// @route Update api/items
// @desc Update A  Book
// @access Private

router.put("/:id", (req, res) => {
  Book.findById({ _id: req.params.id }).exec(function(err, book) {
    if (err) {
      console.error("Error retrieving  Book by id!");
    } else {
      console.log(" Book = " + JSON.stringify(book));
      //res.json(product);
    }
  });
  Book.updateOne({ _id: req.params.id }, { $inc: { units: -1 } }).then(
    result => {
      res.status(200).json({ message: "Update successful!" });
    }
  );
});
//console.log("RESULT:  ", newBook.units, newBook.price, newBook.name);
/*const newBook = new Book({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    units: req.body.units - 1
  });
  console.log("RESULT:  ", newBook.units, newBook.price);
  Book.updateOne({ _id: req.body.id }, newBook).then(result => {
    res.status(200).json({ message: "Update successful!" });*/
// newBook.save().then(book => res.json(book));
/*Book.findByIdAndUpdate(req.params.id, { $set: newBook }, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
    }
    console.log("RESULT:  ");
    //res.send("Done");
  });*/
//});
//});

module.exports = router;
